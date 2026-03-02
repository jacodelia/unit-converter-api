/**
 * Service: ConversionService
 * Orchestrates all conversion operations. Implements MVVM service layer.
 */
import { ConversionCategory, ConversionRequest, ConversionResult, CategoryInfo, SearchResult } from '../models/ConversionRequest';
import { LengthOperations } from '../operations/lengthOperations';
import { TemperatureOperations } from '../operations/temperatureOperations';
import { AreaOperations } from '../operations/areaOperations';
import { VolumeOperations } from '../operations/volumeOperations';
import { WeightOperations } from '../operations/weightOperations';
import { TimeOperations } from '../operations/timeOperations';
import { UNITS_CONFIG, ALL_CATEGORIES } from '../config/units';

export class ConversionService {
  /**
   * Perform a unit conversion.
   */
  convert(request: ConversionRequest): ConversionResult {
    const { category, fromUnit, toUnit, value } = request;
    let toValue: number;
    let formula: string;

    switch (category) {
      case 'length':
        toValue = LengthOperations.convert(value, fromUnit, toUnit);
        formula = LengthOperations.getFormula(fromUnit, toUnit);
        break;
      case 'temperature':
        toValue = TemperatureOperations.convert(value, fromUnit, toUnit);
        formula = TemperatureOperations.getFormula(fromUnit, toUnit);
        break;
      case 'area':
        toValue = AreaOperations.convert(value, fromUnit, toUnit);
        formula = AreaOperations.getFormula(fromUnit, toUnit);
        break;
      case 'volume':
        toValue = VolumeOperations.convert(value, fromUnit, toUnit);
        formula = VolumeOperations.getFormula(fromUnit, toUnit);
        break;
      case 'weight':
        toValue = WeightOperations.convert(value, fromUnit, toUnit);
        formula = WeightOperations.getFormula(fromUnit, toUnit);
        break;
      case 'time':
        toValue = TimeOperations.convert(value, fromUnit, toUnit);
        formula = TimeOperations.getFormula(fromUnit, toUnit);
        break;
      default:
        throw new Error(`Unknown category: ${category}`);
    }

    return {
      category,
      fromUnit,
      toUnit,
      fromValue: value,
      toValue,
      formula,
    };
  }

  /**
   * Get all categories with their unit definitions.
   */
  getAllCategories(): CategoryInfo[] {
    return ALL_CATEGORIES.map(cat => UNITS_CONFIG[cat]);
  }

  /**
   * Get units for a specific category.
   */
  getCategoryUnits(category: ConversionCategory): CategoryInfo {
    const config = UNITS_CONFIG[category];
    if (!config) throw new Error(`Unknown category: ${category}`);
    return config;
  }

  /**
   * Search for unit conversions by a natural language query string.
   * Supports multi-language aliases, case-insensitive.
   * Example: "kilometer to Centimeter", "킬로미터 센티미터", "kilómetro a centímetro"
   */
  search(query: string): SearchResult[] {
    const normalized = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Try to parse "X to Y" or "X Y" patterns
    const separators = [' to ', ' a ', ' à ', ' в ', ' に ', ' 到 ', ' -> ', ' => ', ' - '];
    let fromQuery = normalized;
    let toQuery = '';

    for (const sep of separators) {
      const idx = normalized.indexOf(sep);
      if (idx !== -1) {
        fromQuery = normalized.substring(0, idx).trim();
        toQuery = normalized.substring(idx + sep.length).trim();
        break;
      }
    }

    for (const category of ALL_CATEGORIES) {
      const config = UNITS_CONFIG[category];

      const fromUnit = config.units.find(u =>
        u.key === fromQuery ||
        u.label.toLowerCase() === fromQuery ||
        u.aliases.some(a => a.toLowerCase() === fromQuery)
      );

      if (!fromUnit) continue;

      if (toQuery) {
        const toUnit = config.units.find(u =>
          u.key === toQuery ||
          u.label.toLowerCase() === toQuery ||
          u.aliases.some(a => a.toLowerCase() === toQuery)
        );
        if (toUnit) {
          results.push({ category: category as ConversionCategory, fromUnit, toUnit });
        }
      } else {
        // If no toUnit specified, return first other unit in same category
        const toUnit = config.units.find(u => u.key !== fromUnit.key);
        if (toUnit) {
          results.push({ category: category as ConversionCategory, fromUnit, toUnit });
        }
      }
    }

    return results;
  }
}

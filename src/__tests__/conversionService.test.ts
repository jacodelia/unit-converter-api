/**
 * Tests: conversionService.test.ts
 * Unit tests for ConversionService.
 */
import { ConversionService } from '../services/ConversionService';

const service = new ConversionService();

describe('ConversionService.convert', () => {
  test('converts length: meter to centimeter', () => {
    const result = service.convert({ category: 'length', fromUnit: 'meter', toUnit: 'centimeter', value: 1 });
    expect(result.toValue).toBeCloseTo(100);
    expect(result.formula).toBeTruthy();
  });

  test('converts temperature: celsius to fahrenheit', () => {
    const result = service.convert({ category: 'temperature', fromUnit: 'celsius', toUnit: 'fahrenheit', value: 0 });
    expect(result.toValue).toBeCloseTo(32);
  });

  test('converts area: hectare to squaremeter', () => {
    const result = service.convert({ category: 'area', fromUnit: 'hectare', toUnit: 'squaremeter', value: 1 });
    expect(result.toValue).toBeCloseTo(10000);
  });

  test('converts volume: liter to milliliter', () => {
    const result = service.convert({ category: 'volume', fromUnit: 'liter', toUnit: 'milliliter', value: 1 });
    expect(result.toValue).toBeCloseTo(1000);
  });

  test('converts weight: kilogram to gram', () => {
    const result = service.convert({ category: 'weight', fromUnit: 'kilogram', toUnit: 'gram', value: 1 });
    expect(result.toValue).toBeCloseTo(1000);
  });

  test('converts time: hour to second', () => {
    const result = service.convert({ category: 'time', fromUnit: 'hour', toUnit: 'second', value: 1 });
    expect(result.toValue).toBeCloseTo(3600);
  });

  test('throws on unknown category', () => {
    expect(() =>
      service.convert({ category: 'speed' as never, fromUnit: 'mps', toUnit: 'kph', value: 1 })
    ).toThrow();
  });

  test('result includes all expected fields', () => {
    const result = service.convert({ category: 'length', fromUnit: 'meter', toUnit: 'kilometer', value: 5 });
    expect(result).toHaveProperty('category', 'length');
    expect(result).toHaveProperty('fromUnit', 'meter');
    expect(result).toHaveProperty('toUnit', 'kilometer');
    expect(result).toHaveProperty('fromValue', 5);
    expect(result).toHaveProperty('toValue');
    expect(result).toHaveProperty('formula');
  });
});

describe('ConversionService.getAllCategories', () => {
  test('returns 6 categories', () => {
    const categories = service.getAllCategories();
    expect(categories).toHaveLength(6);
  });

  test('includes all required categories', () => {
    const categories = service.getAllCategories();
    const names = categories.map(c => c.category);
    expect(names).toContain('length');
    expect(names).toContain('temperature');
    expect(names).toContain('area');
    expect(names).toContain('volume');
    expect(names).toContain('weight');
    expect(names).toContain('time');
  });
});

describe('ConversionService.getCategoryUnits', () => {
  test('returns length category with 11 units', () => {
    const cat = service.getCategoryUnits('length');
    expect(cat.units).toHaveLength(11);
  });

  test('returns temperature category with 3 units', () => {
    const cat = service.getCategoryUnits('temperature');
    expect(cat.units).toHaveLength(3);
  });

  test('throws on invalid category', () => {
    expect(() => service.getCategoryUnits('energy' as never)).toThrow();
  });
});

describe('ConversionService.search', () => {
  test('finds kilometer to centimeter', () => {
    const results = service.search('kilometer to centimeter');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].fromUnit.key).toBe('kilometer');
    expect(results[0].toUnit.key).toBe('centimeter');
  });

  test('is case-insensitive: Kilometer To Centimeter', () => {
    const results = service.search('Kilometer To Centimeter');
    expect(results.length).toBeGreaterThan(0);
  });

  test('finds Spanish alias: kilómetro a centímetro', () => {
    const results = service.search('kilómetro a centímetro');
    expect(results.length).toBeGreaterThan(0);
  });

  test('returns empty array for unknown query', () => {
    const results = service.search('parsec to angstrom');
    expect(results).toHaveLength(0);
  });

  test('finds single unit without destination', () => {
    const results = service.search('kilometer');
    expect(results.length).toBeGreaterThan(0);
  });
});

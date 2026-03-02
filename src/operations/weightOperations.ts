/**
 * Operations: weightOperations.ts
 * All weight/mass conversion logic. Base unit: kilogram.
 */

const TO_KILOGRAM: Record<string, number> = {
  kilogram: 1,
  gram: 0.001,
  milligram: 1e-6,
  metricton: 1000,
  longton: 1016.0469088,
  shortton: 907.18474,
  pound: 0.45359237,
  ounce: 0.028349523125,
  carat: 0.0002,
  atomicmassunit: 1.66053906660e-27,
};

export class WeightOperations {
  static convert(value: number, fromUnit: string, toUnit: string): number {
    const fromFactor = TO_KILOGRAM[fromUnit];
    const toFactor = TO_KILOGRAM[toUnit];
    if (fromFactor === undefined) throw new Error(`Unknown weight unit: ${fromUnit}`);
    if (toFactor === undefined) throw new Error(`Unknown weight unit: ${toUnit}`);
    return (value * fromFactor) / toFactor;
  }

  static getFormula(fromUnit: string, toUnit: string): string {
    const fromFactor = TO_KILOGRAM[fromUnit];
    const toFactor = TO_KILOGRAM[toUnit];
    if (fromFactor === undefined || toFactor === undefined) return '';
    const ratio = fromFactor / toFactor;
    return `1 ${fromUnit} = ${ratio.toLocaleString('en-US', { maximumSignificantDigits: 6 })} ${toUnit}`;
  }

  static getSupportedUnits(): string[] {
    return Object.keys(TO_KILOGRAM);
  }
}

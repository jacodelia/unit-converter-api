/**
 * Operations: areaOperations.ts
 * All area conversion logic. Base unit: square meter.
 */

const TO_SQUARE_METER: Record<string, number> = {
  squaremeter: 1,
  squarekilometer: 1e6,
  squarecentimeter: 1e-4,
  squaremillimeter: 1e-6,
  squaremicrometer: 1e-12,
  hectare: 10000,
  squaremile: 2589988.110336,
  squareyard: 0.83612736,
  squarefoot: 0.09290304,
  squareinch: 0.00064516,
  acre: 4046.8564224,
};

export class AreaOperations {
  static convert(value: number, fromUnit: string, toUnit: string): number {
    const fromFactor = TO_SQUARE_METER[fromUnit];
    const toFactor = TO_SQUARE_METER[toUnit];
    if (fromFactor === undefined) throw new Error(`Unknown area unit: ${fromUnit}`);
    if (toFactor === undefined) throw new Error(`Unknown area unit: ${toUnit}`);
    return (value * fromFactor) / toFactor;
  }

  static getFormula(fromUnit: string, toUnit: string): string {
    const fromFactor = TO_SQUARE_METER[fromUnit];
    const toFactor = TO_SQUARE_METER[toUnit];
    if (fromFactor === undefined || toFactor === undefined) return '';
    const ratio = fromFactor / toFactor;
    return `1 ${fromUnit} = ${ratio.toLocaleString('en-US', { maximumSignificantDigits: 6 })} ${toUnit}`;
  }

  static getSupportedUnits(): string[] {
    return Object.keys(TO_SQUARE_METER);
  }
}

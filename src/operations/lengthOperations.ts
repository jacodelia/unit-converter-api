/**
 * Operations: lengthOperations.ts
 * All length conversion logic. Base unit: meter.
 */

const TO_METER: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  micrometer: 1e-6,
  nanometer: 1e-9,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
  lightyear: 9.461e15,
};

export class LengthOperations {
  static convert(value: number, fromUnit: string, toUnit: string): number {
    const fromFactor = TO_METER[fromUnit];
    const toFactor = TO_METER[toUnit];
    if (fromFactor === undefined) throw new Error(`Unknown length unit: ${fromUnit}`);
    if (toFactor === undefined) throw new Error(`Unknown length unit: ${toUnit}`);
    const valueInMeters = value * fromFactor;
    return valueInMeters / toFactor;
  }

  static getFormula(fromUnit: string, toUnit: string): string {
    const fromFactor = TO_METER[fromUnit];
    const toFactor = TO_METER[toUnit];
    if (fromFactor === undefined || toFactor === undefined) return '';
    const ratio = fromFactor / toFactor;
    return `1 ${fromUnit} = ${ratio.toLocaleString('en-US', { maximumSignificantDigits: 6 })} ${toUnit}`;
  }

  static getSupportedUnits(): string[] {
    return Object.keys(TO_METER);
  }
}

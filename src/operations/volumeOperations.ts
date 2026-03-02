/**
 * Operations: volumeOperations.ts
 * All volume conversion logic. Base unit: liter.
 */

const TO_LITER: Record<string, number> = {
  cubicmeter: 1000,
  cubickilometer: 1e12,
  cubiccentimeter: 0.001,
  cubicmillimeter: 1e-6,
  liter: 1,
  milliliter: 0.001,
  usgallon: 3.785411784,
  usquart: 0.946352946,
  uspint: 0.473176473,
  uscup: 0.2365882365,
  usfluidounce: 0.0295735296,
};

export class VolumeOperations {
  static convert(value: number, fromUnit: string, toUnit: string): number {
    const fromFactor = TO_LITER[fromUnit];
    const toFactor = TO_LITER[toUnit];
    if (fromFactor === undefined) throw new Error(`Unknown volume unit: ${fromUnit}`);
    if (toFactor === undefined) throw new Error(`Unknown volume unit: ${toUnit}`);
    return (value * fromFactor) / toFactor;
  }

  static getFormula(fromUnit: string, toUnit: string): string {
    const fromFactor = TO_LITER[fromUnit];
    const toFactor = TO_LITER[toUnit];
    if (fromFactor === undefined || toFactor === undefined) return '';
    const ratio = fromFactor / toFactor;
    return `1 ${fromUnit} = ${ratio.toLocaleString('en-US', { maximumSignificantDigits: 6 })} ${toUnit}`;
  }

  static getSupportedUnits(): string[] {
    return Object.keys(TO_LITER);
  }
}

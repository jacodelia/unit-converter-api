/**
 * Operations: timeOperations.ts
 * All time conversion logic. Base unit: second.
 */

const TO_SECOND: Record<string, number> = {
  second: 1,
  millisecond: 0.001,
  microsecond: 1e-6,
  nanosecond: 1e-9,
  picosecond: 1e-12,
  minute: 60,
  hour: 3600,
  day: 86400,
  week: 604800,
  month: 2629746,     // Average month (365.2425 days / 12)
  year: 31556952,     // Julian year (365.2425 days)
};

export class TimeOperations {
  static convert(value: number, fromUnit: string, toUnit: string): number {
    const fromFactor = TO_SECOND[fromUnit];
    const toFactor = TO_SECOND[toUnit];
    if (fromFactor === undefined) throw new Error(`Unknown time unit: ${fromUnit}`);
    if (toFactor === undefined) throw new Error(`Unknown time unit: ${toUnit}`);
    return (value * fromFactor) / toFactor;
  }

  static getFormula(fromUnit: string, toUnit: string): string {
    const fromFactor = TO_SECOND[fromUnit];
    const toFactor = TO_SECOND[toUnit];
    if (fromFactor === undefined || toFactor === undefined) return '';
    const ratio = fromFactor / toFactor;
    return `1 ${fromUnit} = ${ratio.toLocaleString('en-US', { maximumSignificantDigits: 6 })} ${toUnit}`;
  }

  static getSupportedUnits(): string[] {
    return Object.keys(TO_SECOND);
  }
}

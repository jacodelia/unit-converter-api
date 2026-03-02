/**
 * Operations: temperatureOperations.ts
 * All temperature conversion logic. Special case - not linear factor-based.
 */

export class TemperatureOperations {
  static toCelsius(value: number, fromUnit: string): number {
    switch (fromUnit) {
      case 'celsius':
        return value;
      case 'fahrenheit':
        return (value - 32) * (5 / 9);
      case 'kelvin':
        return value - 273.15;
      default:
        throw new Error(`Unknown temperature unit: ${fromUnit}`);
    }
  }

  static fromCelsius(celsius: number, toUnit: string): number {
    switch (toUnit) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return celsius * (9 / 5) + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        throw new Error(`Unknown temperature unit: ${toUnit}`);
    }
  }

  static convert(value: number, fromUnit: string, toUnit: string): number {
    const celsius = TemperatureOperations.toCelsius(value, fromUnit);
    return TemperatureOperations.fromCelsius(celsius, toUnit);
  }

  static getFormula(fromUnit: string, toUnit: string): string {
    const formulas: Record<string, string> = {
      'celsius-fahrenheit': '(°C × 9/5) + 32 = °F',
      'fahrenheit-celsius': '(°F − 32) × 5/9 = °C',
      'celsius-kelvin': '°C + 273.15 = K',
      'kelvin-celsius': 'K − 273.15 = °C',
      'fahrenheit-kelvin': '(°F − 32) × 5/9 + 273.15 = K',
      'kelvin-fahrenheit': '(K − 273.15) × 9/5 + 32 = °F',
      'celsius-celsius': '°C = °C',
      'fahrenheit-fahrenheit': '°F = °F',
      'kelvin-kelvin': 'K = K',
    };
    return formulas[`${fromUnit}-${toUnit}`] ?? `${fromUnit} → ${toUnit}`;
  }

  static getSupportedUnits(): string[] {
    return ['celsius', 'kelvin', 'fahrenheit'];
  }
}

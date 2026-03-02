/**
 * Tests: operations.test.ts
 * Unit tests for all conversion operations.
 */
import { LengthOperations } from '../operations/lengthOperations';
import { TemperatureOperations } from '../operations/temperatureOperations';
import { AreaOperations } from '../operations/areaOperations';
import { VolumeOperations } from '../operations/volumeOperations';
import { WeightOperations } from '../operations/weightOperations';
import { TimeOperations } from '../operations/timeOperations';

// ─── LENGTH ────────────────────────────────────────────────────────────────
describe('LengthOperations', () => {
  test('1 kilometer = 1000 meters', () => {
    expect(LengthOperations.convert(1, 'kilometer', 'meter')).toBeCloseTo(1000);
  });
  test('1 meter = 100 centimeters', () => {
    expect(LengthOperations.convert(1, 'meter', 'centimeter')).toBeCloseTo(100);
  });
  test('1 mile ≈ 1609.344 meters', () => {
    expect(LengthOperations.convert(1, 'mile', 'meter')).toBeCloseTo(1609.344);
  });
  test('1 foot = 12 inches', () => {
    expect(LengthOperations.convert(1, 'foot', 'inch')).toBeCloseTo(12);
  });
  test('1 yard = 3 feet', () => {
    expect(LengthOperations.convert(1, 'yard', 'foot')).toBeCloseTo(3);
  });
  test('same unit conversion returns same value', () => {
    expect(LengthOperations.convert(42, 'meter', 'meter')).toBeCloseTo(42);
  });
  test('throws on unknown unit', () => {
    expect(() => LengthOperations.convert(1, 'fathom', 'meter')).toThrow();
  });
  test('getFormula returns a non-empty string', () => {
    expect(LengthOperations.getFormula('kilometer', 'meter')).toContain('kilometer');
  });
  test('getSupportedUnits returns all expected units', () => {
    const units = LengthOperations.getSupportedUnits();
    expect(units).toContain('meter');
    expect(units).toContain('kilometer');
    expect(units).toContain('lightyear');
  });
});

// ─── TEMPERATURE ────────────────────────────────────────────────────────────
describe('TemperatureOperations', () => {
  test('0°C = 32°F', () => {
    expect(TemperatureOperations.convert(0, 'celsius', 'fahrenheit')).toBeCloseTo(32);
  });
  test('100°C = 212°F', () => {
    expect(TemperatureOperations.convert(100, 'celsius', 'fahrenheit')).toBeCloseTo(212);
  });
  test('0°C = 273.15K', () => {
    expect(TemperatureOperations.convert(0, 'celsius', 'kelvin')).toBeCloseTo(273.15);
  });
  test('32°F = 0°C', () => {
    expect(TemperatureOperations.convert(32, 'fahrenheit', 'celsius')).toBeCloseTo(0);
  });
  test('300K → °C ≈ 26.85', () => {
    expect(TemperatureOperations.convert(300, 'kelvin', 'celsius')).toBeCloseTo(26.85);
  });
  test('same unit returns same value', () => {
    expect(TemperatureOperations.convert(25, 'celsius', 'celsius')).toBeCloseTo(25);
  });
  test('throws on unknown unit', () => {
    expect(() => TemperatureOperations.convert(100, 'rankine', 'celsius')).toThrow();
  });
  test('getFormula celsius-fahrenheit', () => {
    const formula = TemperatureOperations.getFormula('celsius', 'fahrenheit');
    expect(formula).toContain('9/5');
  });
  test('getSupportedUnits includes celsius, fahrenheit, kelvin', () => {
    const units = TemperatureOperations.getSupportedUnits();
    expect(units).toContain('celsius');
    expect(units).toContain('fahrenheit');
    expect(units).toContain('kelvin');
  });
});

// ─── AREA ────────────────────────────────────────────────────────────────────
describe('AreaOperations', () => {
  test('1 squarekilometer = 1,000,000 squaremeters', () => {
    expect(AreaOperations.convert(1, 'squarekilometer', 'squaremeter')).toBeCloseTo(1_000_000);
  });
  test('1 hectare = 10,000 squaremeters', () => {
    expect(AreaOperations.convert(1, 'hectare', 'squaremeter')).toBeCloseTo(10000);
  });
  test('1 acre ≈ 4046.856 squaremeters', () => {
    expect(AreaOperations.convert(1, 'acre', 'squaremeter')).toBeCloseTo(4046.856);
  });
  test('throws on unknown unit', () => {
    expect(() => AreaOperations.convert(1, 'rood', 'squaremeter')).toThrow();
  });
  test('getSupportedUnits returns all area units', () => {
    const units = AreaOperations.getSupportedUnits();
    expect(units).toContain('squaremeter');
    expect(units).toContain('hectare');
    expect(units).toContain('acre');
  });
});

// ─── VOLUME ──────────────────────────────────────────────────────────────────
describe('VolumeOperations', () => {
  test('1 liter = 1000 milliliters', () => {
    expect(VolumeOperations.convert(1, 'liter', 'milliliter')).toBeCloseTo(1000);
  });
  test('1 usgallon ≈ 3.785 liters', () => {
    expect(VolumeOperations.convert(1, 'usgallon', 'liter')).toBeCloseTo(3.785);
  });
  test('1 cubicmeter = 1000 liters', () => {
    expect(VolumeOperations.convert(1, 'cubicmeter', 'liter')).toBeCloseTo(1000);
  });
  test('throws on unknown unit', () => {
    expect(() => VolumeOperations.convert(1, 'barrel', 'liter')).toThrow();
  });
  test('getSupportedUnits returns all volume units', () => {
    const units = VolumeOperations.getSupportedUnits();
    expect(units).toContain('liter');
    expect(units).toContain('usgallon');
    expect(units).toContain('cubicmeter');
  });
});

// ─── WEIGHT ──────────────────────────────────────────────────────────────────
describe('WeightOperations', () => {
  test('1 kilogram = 1000 grams', () => {
    expect(WeightOperations.convert(1, 'kilogram', 'gram')).toBeCloseTo(1000);
  });
  test('1 pound ≈ 453.592 grams', () => {
    expect(WeightOperations.convert(1, 'pound', 'gram')).toBeCloseTo(453.592);
  });
  test('1 metricton = 1000 kilograms', () => {
    expect(WeightOperations.convert(1, 'metricton', 'kilogram')).toBeCloseTo(1000);
  });
  test('1 ounce ≈ 28.35 grams', () => {
    expect(WeightOperations.convert(1, 'ounce', 'gram')).toBeCloseTo(28.35);
  });
  test('throws on unknown unit', () => {
    expect(() => WeightOperations.convert(1, 'stone', 'kilogram')).toThrow();
  });
  test('getSupportedUnits returns all weight units', () => {
    const units = WeightOperations.getSupportedUnits();
    expect(units).toContain('kilogram');
    expect(units).toContain('pound');
    expect(units).toContain('metricton');
  });
});

// ─── TIME ────────────────────────────────────────────────────────────────────
describe('TimeOperations', () => {
  test('1 minute = 60 seconds', () => {
    expect(TimeOperations.convert(1, 'minute', 'second')).toBeCloseTo(60);
  });
  test('1 hour = 3600 seconds', () => {
    expect(TimeOperations.convert(1, 'hour', 'second')).toBeCloseTo(3600);
  });
  test('1 day = 24 hours', () => {
    expect(TimeOperations.convert(1, 'day', 'hour')).toBeCloseTo(24);
  });
  test('1 week = 7 days', () => {
    expect(TimeOperations.convert(1, 'week', 'day')).toBeCloseTo(7);
  });
  test('1 second = 1000 milliseconds', () => {
    expect(TimeOperations.convert(1, 'second', 'millisecond')).toBeCloseTo(1000);
  });
  test('throws on unknown unit', () => {
    expect(() => TimeOperations.convert(1, 'fortnight', 'day')).toThrow();
  });
  test('getSupportedUnits returns all time units', () => {
    const units = TimeOperations.getSupportedUnits();
    expect(units).toContain('second');
    expect(units).toContain('hour');
    expect(units).toContain('year');
  });
});

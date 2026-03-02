/**
 * Tests: searchService.test.ts
 * Unit tests for SearchService.navigate() – the NLP tokeniser.
 */
import { SearchService } from '../services/SearchService';

const svc = new SearchService();

describe('SearchService.navigate – basic patterns', () => {
  test('"kilometer to centimeter" matches length category', () => {
    const r = svc.navigate('kilometer to centimeter');
    expect(r.matched).toBe(true);
    expect(r.category).toBe('length');
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('centimeter');
    expect(r.extractedValue).toBeNull();
  });

  test('"from kilometers to meters" strips noise word "from"', () => {
    const r = svc.navigate('from kilometers to meters');
    expect(r.matched).toBe(true);
    expect(r.category).toBe('length');
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('meter');
  });

  test('"kilometer to meter" (singular/plural alias)', () => {
    const r = svc.navigate('kilometer to meter');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('meter');
  });

  test('"convert 5 km to miles" extracts value 5', () => {
    const r = svc.navigate('convert 5 km to miles');
    expect(r.matched).toBe(true);
    expect(r.extractedValue).toBe(5);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('mile');
  });

  test('"100.5 celsius to fahrenheit" extracts decimal value', () => {
    const r = svc.navigate('100.5 celsius to fahrenheit');
    expect(r.matched).toBe(true);
    expect(r.extractedValue).toBeCloseTo(100.5);
    expect(r.category).toBe('temperature');
  });

  test('"Celsius to Fahrenheit" is case-insensitive', () => {
    const r = svc.navigate('Celsius to Fahrenheit');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('celsius');
    expect(r.toUnit?.key).toBe('fahrenheit');
  });

  test('"Kilometer To Centimeter" is case-insensitive', () => {
    const r = svc.navigate('Kilometer To Centimeter');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('centimeter');
  });
});

describe('SearchService.navigate – separator variants', () => {
  test('"kilometer → meter" uses arrow separator', () => {
    const r = svc.navigate('kilometer → meter');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('meter');
  });

  test('"kilometer in centimeter" uses "in" separator', () => {
    const r = svc.navigate('kilometer in centimeter');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('centimeter');
  });

  test('"kilogram -> pound" uses arrow separator', () => {
    const r = svc.navigate('kilogram -> pound');
    expect(r.matched).toBe(true);
    expect(r.category).toBe('weight');
  });
});

describe('SearchService.navigate – multilingual aliases', () => {
  test('Spanish: "kilómetro a centímetro"', () => {
    const r = svc.navigate('kilómetro a centímetro');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('centimeter');
  });

  test('Spanish: "de kilómetros a metros"', () => {
    const r = svc.navigate('de kilómetros a metros');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('meter');
  });

  test('French: "kilomètre à centimètre"', () => {
    const r = svc.navigate('kilomètre à centimètre');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('centimeter');
  });

  test('Chinese: "千米 到 厘米"', () => {
    const r = svc.navigate('千米 到 厘米');
    expect(r.matched).toBe(true);
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit?.key).toBe('centimeter');
  });
});

describe('SearchService.navigate – single-unit queries', () => {
  test('"kilometer" alone returns match with default counterpart', () => {
    const r = svc.navigate('kilometer');
    expect(r.matched).toBe(true);
    expect(r.category).toBe('length');
    expect(r.fromUnit?.key).toBe('kilometer');
    expect(r.toUnit).not.toBeNull();
    expect(r.toUnit?.key).not.toBe('kilometer');
  });

  test('"celsius" alone navigates to temperature', () => {
    const r = svc.navigate('celsius');
    expect(r.matched).toBe(true);
    expect(r.category).toBe('temperature');
  });
});

describe('SearchService.navigate – no match', () => {
  test('empty string returns matched=false', () => {
    expect(svc.navigate('').matched).toBe(false);
  });

  test('whitespace-only returns matched=false', () => {
    expect(svc.navigate('   ').matched).toBe(false);
  });

  test('unknown unit "parsec to angstrom" returns matched=false', () => {
    expect(svc.navigate('parsec to angstrom').matched).toBe(false);
  });

  test('mixed categories "kilometer to celsius" returns matched=false', () => {
    expect(svc.navigate('kilometer to celsius').matched).toBe(false);
  });
});

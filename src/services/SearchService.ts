/**
 * Service: SearchService.ts
 * Dedicated natural-language search/navigate service.
 *
 * Handles patterns such as:
 *   "kilometer to centimeter"
 *   "from kilometers to meters"
 *   "5 km to miles"
 *   "kilómetro a centímetro"
 *   "キロメートル から センチメートル"
 *   "Celsius in Fahrenheit"
 *   "convert 100 pounds to kilograms"
 *
 * Algorithm
 * ─────────
 * 1. Scan the full query for any embedded number (e.g. "convert 5 km…" → 5).
 * 2. Remove noise words and numbers, leaving only unit tokens.
 * 3. Split on directional separators to get fromToken / toToken.
 * 4. Match each token against every unit's key, label and aliases
 *    (all comparisons are lower-case, diacritic-stripped).
 * 5. Both tokens must resolve to units within the same category for a full match.
 *    A single-unit match navigates to that unit's category with a default counterpart.
 *    Cross-category pairs are not matched.
 */
import { ConversionCategory, NavigateResult, UnitInfo } from '../models/ConversionRequest';
import { UNITS_CONFIG, ALL_CATEGORIES } from '../config/units';

// ---------------------------------------------------------------------------
// Noise words stripped from each side before unit matching
// ---------------------------------------------------------------------------
const NOISE_WORDS = new Set([
  // English
  'from', 'convert', 'change', 'what', 'is', 'are', 'how', 'many', 'much',
  // Spanish
  'de', 'convierte', 'convertir', 'cuántos', 'cuánto',
  // French
  'convertir', 'combien',
  // German
  'von', 'umrechnen', 'wie', 'viele',
  // Italian
  'da', 'convertire', 'quanti',
  // Russian
  'из', 'конвертировать', 'сколько',
  // Japanese
  'から', 'へ', 'を',
  // Chinese
  '从', '把', '转', '换',
]);

// ---------------------------------------------------------------------------
// Directional separators that split "from-unit → to-unit"
// ---------------------------------------------------------------------------
const SEPARATORS = [
  ' to ',
  ' into ',
  ' in ',
  ' a ',
  ' en ',
  ' à ',
  ' nach ',
  ' в ',
  ' до ',
  ' に ',
  ' 到 ',
  ' -> ',
  ' => ',
  ' → ',
  ' - ',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Remove diacritics for fuzzy matching (kilómetro → kilometro). */
function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalise(s: string): string {
  return stripDiacritics(s.toLowerCase().trim());
}

/**
 * Extract the first numeric value found anywhere in the query.
 * Returns [value, queryWithNumberRemoved].
 */
function extractNumber(raw: string): [number | null, string] {
  const numberRe = /[+-]?\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?/;
  const m = raw.match(numberRe);
  if (!m) return [null, raw];
  const num = parseFloat(m[0].replace(',', '.'));
  const cleaned = raw.replace(m[0], ' ').replace(/\s{2,}/g, ' ').trim();
  return [isNaN(num) ? null : num, cleaned];
}

/** Strip noise words from a space-separated token string. */
function stripNoise(s: string): string {
  return s
    .split(/\s+/)
    .filter(t => !NOISE_WORDS.has(normalise(t)))
    .join(' ')
    .trim();
}

/** Try to find a unit in any category matching the token. */
function matchUnit(token: string): { category: ConversionCategory; unit: UnitInfo } | null {
  const t = normalise(token);
  if (!t) return null;

  for (const cat of ALL_CATEGORIES) {
    const config = UNITS_CONFIG[cat];
    for (const unit of config.units) {
      if (
        normalise(unit.key) === t ||
        normalise(unit.label) === t ||
        normalise(unit.symbol) === t ||
        unit.aliases.some(a => normalise(a) === t)
      ) {
        return { category: cat as ConversionCategory, unit };
      }
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export class SearchService {
  /**
   * Navigate: resolve a free-text query to a category + from/to units.
   * Returns a NavigateResult regardless of whether a match was found.
   */
  navigate(rawQuery: string): NavigateResult {
    const EMPTY: NavigateResult = {
      matched: false,
      category: null,
      fromUnit: null,
      toUnit: null,
      extractedValue: null,
      parsedQuery: rawQuery,
    };

    if (!rawQuery || rawQuery.trim().length === 0) return EMPTY;

    // 1. Extract any embedded number first (works for "5 km to miles" and
    //    "convert 5 km to miles" equally)
    const [extractedValue, withoutNumber] = extractNumber(rawQuery.trim());
    const working = withoutNumber.toLowerCase();

    // 2. Try to split on a directional separator
    let fromToken = '';
    let toToken = '';
    let splitFound = false;

    for (const sep of SEPARATORS) {
      const idx = working.indexOf(sep);
      if (idx !== -1) {
        fromToken = working.substring(0, idx).trim();
        toToken = working.substring(idx + sep.length).trim();
        splitFound = true;
        break;
      }
    }

    if (splitFound) {
      // Strip noise from each side independently
      fromToken = stripNoise(fromToken);
      toToken = stripNoise(toToken);
    } else {
      // No separator – strip noise then take first two remaining tokens
      const tokens = stripNoise(working).split(/\s+/).filter(Boolean);
      fromToken = tokens[0] ?? '';
      toToken = tokens[1] ?? '';
    }

    // 3. Match units
    const fromMatch = fromToken ? matchUnit(fromToken) : null;
    const toMatch = toToken ? matchUnit(toToken) : null;

    // 4. Both must resolve AND be in the same category
    if (fromMatch && toMatch) {
      if (fromMatch.category !== toMatch.category) {
        // Cross-category: no valid match
        return EMPTY;
      }
      return {
        matched: true,
        category: fromMatch.category,
        fromUnit: fromMatch.unit,
        toUnit: toMatch.unit,
        extractedValue,
        parsedQuery: `${fromToken} → ${toToken}`,
      };
    }

    // 5. Single-unit match – navigate to category, pick default counterpart
    const singleMatch = fromMatch ?? toMatch;
    if (singleMatch) {
      const config = UNITS_CONFIG[singleMatch.category];
      const counterpart = config.units.find(u => u.key !== singleMatch.unit.key) ?? null;
      return {
        matched: true,
        category: singleMatch.category,
        fromUnit: singleMatch.unit,
        toUnit: counterpart,
        extractedValue,
        parsedQuery: singleMatch.unit.key,
      };
    }

    return EMPTY;
  }
}

/**
 * Model: ConversionRequest
 * Represents the data structure for a unit conversion request.
 */
export interface ConversionRequest {
  category: ConversionCategory;
  fromUnit: string;
  toUnit: string;
  value: number;
}

/**
 * Model: ConversionResult
 * Represents the result of a unit conversion operation.
 */
export interface ConversionResult {
  category: ConversionCategory;
  fromUnit: string;
  toUnit: string;
  fromValue: number;
  toValue: number;
  formula: string;
}

/**
 * Model: ConversionCategory
 * Enum of all supported conversion categories.
 */
export type ConversionCategory =
  | 'length'
  | 'temperature'
  | 'area'
  | 'volume'
  | 'weight'
  | 'time';

/**
 * Model: UnitInfo
 * Describes a single unit with its label and aliases.
 */
export interface UnitInfo {
  key: string;
  label: string;
  symbol: string;
  aliases: string[];
}

/**
 * Model: CategoryInfo
 * Describes a category with all its units.
 */
export interface CategoryInfo {
  category: ConversionCategory;
  label: string;
  units: UnitInfo[];
}

/**
 * Model: SearchResult
 * Result of a unit search query.
 */
export interface SearchResult {
  category: ConversionCategory;
  fromUnit: UnitInfo;
  toUnit: UnitInfo;
}

/**
 * Model: AuthToken
 * JWT authentication token model.
 */
export interface AuthToken {
  token: string;
  expiresIn: string;
  tokenType: string;
}

/**
 * Model: TokenPayload
 * JWT token payload structure.
 */
export interface TokenPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

/**
 * Model: NavigateResult
 * Returned by POST /api/navigate.
 * Carries the resolved category, units and an optional numeric value
 * extracted directly from the query string (e.g. "5 km to miles").
 */
export interface NavigateResult {
  matched: boolean;
  category: ConversionCategory | null;
  fromUnit: UnitInfo | null;
  toUnit: UnitInfo | null;
  /** Numeric value parsed from the query, if present (e.g. "5 km to miles" → 5). */
  extractedValue: number | null;
  /** The normalised query the server actually parsed. */
  parsedQuery: string;
}

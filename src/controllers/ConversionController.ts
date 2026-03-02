/**
 * Controller: ConversionController
 * Handles all conversion-related HTTP requests.
 */
import { Request, Response } from 'express';
import { ConversionService } from '../services/ConversionService';
import { SearchService } from '../services/SearchService';
import { ConversionCategory, ConversionRequest } from '../models/ConversionRequest';

export class ConversionController {
  private conversionService: ConversionService;
  private searchService: SearchService;

  constructor() {
    this.conversionService = new ConversionService();
    this.searchService = new SearchService();
  }

  /**
   * GET /api/categories
   * Returns all available conversion categories and their units.
   */
  getCategories = (_req: Request, res: Response): void => {
    const categories = this.conversionService.getAllCategories();
    res.status(200).json({ categories });
  };

  /**
   * GET /api/categories/:category
   * Returns units for a specific category.
   */
  getCategoryUnits = (req: Request, res: Response): void => {
    const { category } = req.params;
    try {
      const data = this.conversionService.getCategoryUnits(category as ConversionCategory);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({
        error: 'Not Found',
        message: (error as Error).message,
      });
    }
  };

  /**
   * POST /api/convert
   * Perform a unit conversion.
   * Body: { category, fromUnit, toUnit, value }
   */
  convert = (req: Request, res: Response): void => {
    const body = req.body as Partial<ConversionRequest>;

    if (
      body.category === undefined ||
      body.fromUnit === undefined ||
      body.toUnit === undefined ||
      body.value === undefined
    ) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Required fields: category, fromUnit, toUnit, value',
      });
      return;
    }

    if (typeof body.value !== 'number' || isNaN(body.value)) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Field "value" must be a valid number',
      });
      return;
    }

    try {
      const result = this.conversionService.convert(body as ConversionRequest);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        error: 'Bad Request',
        message: (error as Error).message,
      });
    }
  };

  /**
   * GET /api/search?q=kilometer+to+centimeter
   * Search for unit conversions by natural language query.
   */
  search = (req: Request, res: Response): void => {
    const q = req.query['q'] as string | undefined;

    if (!q || q.trim() === '') {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Query parameter "q" is required',
      });
      return;
    }

    const results = this.conversionService.search(q);
    res.status(200).json({ results, query: q });
  };

  /**
   * POST /api/navigate
   * Resolve a free-text natural language query to a category + units and
   * optionally an extracted numeric value so the frontend can navigate
   * directly to the right converter state.
   *
   * Body: { query: string }
   * Supports patterns like:
   *   "from kilometers to meters"
   *   "kilometer to meter"
   *   "5 km to miles"
   *   "kilómetro a centímetro"
   */
  navigate = (req: Request, res: Response): void => {
    const { query } = req.body as { query?: string };

    if (!query || query.trim() === '') {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Request body field "query" is required',
      });
      return;
    }

    const result = this.searchService.navigate(query);
    res.status(200).json(result);
  };
}

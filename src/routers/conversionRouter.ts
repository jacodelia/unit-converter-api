/**
 * Router: conversionRouter.ts
 * Conversion API routes. All routes require JWT authentication.
 */
import { Router } from 'express';
import { ConversionController } from '../controllers/ConversionController';
import { authenticateJWT } from '../middleware/authMiddleware';

const conversionRouter = Router();
const conversionController = new ConversionController();

// Apply JWT middleware to all routes
conversionRouter.use(authenticateJWT);

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Get all conversion categories
 *     tags: [Conversions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all categories and their units
 */
conversionRouter.get('/categories', conversionController.getCategories);

/**
 * @openapi
 * /api/categories/{category}:
 *   get:
 *     summary: Get units for a specific category
 *     tags: [Conversions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [length, temperature, area, volume, weight, time]
 *     responses:
 *       200:
 *         description: Category info with units
 *       404:
 *         description: Category not found
 */
conversionRouter.get('/categories/:category', conversionController.getCategoryUnits);

/**
 * @openapi
 * /api/convert:
 *   post:
 *     summary: Perform a unit conversion
 *     tags: [Conversions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [category, fromUnit, toUnit, value]
 *             properties:
 *               category:
 *                 type: string
 *                 enum: [length, temperature, area, volume, weight, time]
 *               fromUnit:
 *                 type: string
 *               toUnit:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Conversion result
 *       400:
 *         description: Invalid request
 */
conversionRouter.post('/convert', conversionController.convert);

/**
 * @openapi
 * /api/search:
 *   get:
 *     summary: Search units by natural language query
 *     tags: [Conversions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Query like "kilometer to centimeter"
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Missing query
 */
conversionRouter.get('/search', conversionController.search);

/**
 * @openapi
 * /api/navigate:
 *   post:
 *     summary: Resolve a natural language query to a converter state
 *     description: >
 *       Parses free-text such as "from kilometers to meters",
 *       "5 km to miles", or "kilómetro a centímetro" and returns
 *       the matched category, fromUnit, toUnit and an optional
 *       extracted numeric value so the frontend can navigate directly.
 *     tags: [Conversions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [query]
 *             properties:
 *               query:
 *                 type: string
 *                 example: "from kilometers to meters"
 *     responses:
 *       200:
 *         description: Navigation result (matched may be false if nothing found)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matched:
 *                   type: boolean
 *                 category:
 *                   type: string
 *                   nullable: true
 *                 fromUnit:
 *                   type: object
 *                   nullable: true
 *                 toUnit:
 *                   type: object
 *                   nullable: true
 *                 extractedValue:
 *                   type: number
 *                   nullable: true
 *                 parsedQuery:
 *                   type: string
 *       400:
 *         description: Missing query field
 */
conversionRouter.post('/navigate', conversionController.navigate);

export default conversionRouter;

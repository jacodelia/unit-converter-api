/**
 * Router: authRouter.ts
 * Authentication routes.
 */
import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const authRouter = Router();
const authController = new AuthController();

/**
 * @openapi
 * /api/auth/token:
 *   post:
 *     summary: Generate JWT Bearer token
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 example: my-client-app
 *     responses:
 *       200:
 *         description: JWT token issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: string
 *                 tokenType:
 *                   type: string
 */
authRouter.post('/token', authController.getToken);

export default authRouter;

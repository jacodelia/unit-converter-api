/**
 * Middleware: authMiddleware.ts
 * JWT Bearer token authentication middleware.
 */
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Use: Bearer <token>',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = authService.verifyToken(token);
    (req as Request & { user?: unknown }).user = payload;
    next();
  } catch {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid or expired JWT token.',
    });
  }
}

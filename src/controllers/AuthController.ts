/**
 * Controller: AuthController
 * Handles authentication endpoints.
 */
import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * POST /api/auth/token
   * Generate a JWT bearer token.
   */
  getToken = (req: Request, res: Response): void => {
    const clientId = (req.body as { clientId?: string }).clientId ?? 'anonymous';
    const authToken = this.authService.generateToken(clientId);
    res.status(200).json(authToken);
  };
}

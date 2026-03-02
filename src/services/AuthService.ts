/**
 * Service: AuthService
 * Handles JWT token generation and verification.
 */
import jwt from 'jsonwebtoken';
import { AuthToken, TokenPayload } from '../models/ConversionRequest';

export class AuthService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env['JWT_SECRET'] ?? 'default_dev_secret_change_in_production';
    this.expiresIn = process.env['JWT_EXPIRES_IN'] ?? '24h';
  }

  /**
   * Generate a new JWT token.
   */
  generateToken(clientId: string = 'anonymous'): AuthToken {
    const payload: TokenPayload = { sub: clientId };
    const token = jwt.sign(payload, this.secret, {
      expiresIn: this.expiresIn as jwt.SignOptions['expiresIn'],
    });
    return {
      token,
      expiresIn: this.expiresIn,
      tokenType: 'Bearer',
    };
  }

  /**
   * Verify a JWT token and return the payload.
   */
  verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }
}

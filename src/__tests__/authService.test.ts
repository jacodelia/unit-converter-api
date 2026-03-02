/**
 * Tests: authService.test.ts
 * Unit tests for AuthService JWT token generation and verification.
 */
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

describe('AuthService', () => {
  test('generateToken returns a token object with required fields', () => {
    const result = authService.generateToken('test-client');
    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('expiresIn');
    expect(result).toHaveProperty('tokenType', 'Bearer');
    expect(typeof result.token).toBe('string');
    expect(result.token.length).toBeGreaterThan(0);
  });

  test('verifyToken returns the payload with correct sub', () => {
    const { token } = authService.generateToken('my-client');
    const payload = authService.verifyToken(token);
    expect(payload.sub).toBe('my-client');
  });

  test('verifyToken throws on invalid token', () => {
    expect(() => authService.verifyToken('invalid.token.here')).toThrow();
  });

  test('verifyToken throws on tampered token', () => {
    const { token } = authService.generateToken('client');
    const tampered = token.slice(0, -5) + 'XXXXX';
    expect(() => authService.verifyToken(tampered)).toThrow();
  });

  test('generateToken uses anonymous as default clientId', () => {
    const { token } = authService.generateToken();
    const payload = authService.verifyToken(token);
    expect(payload.sub).toBe('anonymous');
  });
});

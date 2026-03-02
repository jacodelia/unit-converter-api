/**
 * Tests: api.test.ts
 * Integration tests for the REST API endpoints.
 */
import 'dotenv/config';
import request from 'supertest';
import app from '../app';

let jwtToken: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/token')
    .send({ clientId: 'test-suite' });
  jwtToken = (res.body as { token: string }).token;
});

// ─── HEALTH ─────────────────────────────────────────────────────────────────
describe('GET /health', () => {
  test('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});

// ─── AUTH ────────────────────────────────────────────────────────────────────
describe('POST /api/auth/token', () => {
  test('returns a JWT token', async () => {
    const res = await request(app)
      .post('/api/auth/token')
      .send({ clientId: 'test' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('tokenType', 'Bearer');
  });

  test('works with empty body (anonymous)', async () => {
    const res = await request(app).post('/api/auth/token').send({});
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
describe('GET /api/categories', () => {
  test('returns 401 without token', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(401);
  });

  test('returns categories with valid token', async () => {
    const res = await request(app)
      .get('/api/categories')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('categories');
    expect(Array.isArray(res.body.categories)).toBe(true);
    expect(res.body.categories).toHaveLength(6);
  });
});

describe('GET /api/categories/:category', () => {
  test('returns length category', async () => {
    const res = await request(app)
      .get('/api/categories/length')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('category', 'length');
    expect(res.body.units).toHaveLength(11);
  });

  test('returns 404 for unknown category', async () => {
    const res = await request(app)
      .get('/api/categories/energy')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(404);
  });
});

// ─── CONVERT ─────────────────────────────────────────────────────────────────
describe('POST /api/convert', () => {
  test('converts 1 kilometer to 1000 meters', async () => {
    const res = await request(app)
      .post('/api/convert')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ category: 'length', fromUnit: 'kilometer', toUnit: 'meter', value: 1 });
    expect(res.status).toBe(200);
    expect(res.body.toValue).toBeCloseTo(1000);
  });

  test('converts 0 celsius to 32 fahrenheit', async () => {
    const res = await request(app)
      .post('/api/convert')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ category: 'temperature', fromUnit: 'celsius', toUnit: 'fahrenheit', value: 0 });
    expect(res.status).toBe(200);
    expect(res.body.toValue).toBeCloseTo(32);
  });

  test('returns 400 for missing fields', async () => {
    const res = await request(app)
      .post('/api/convert')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ category: 'length' });
    expect(res.status).toBe(400);
  });

  test('returns 400 for invalid value', async () => {
    const res = await request(app)
      .post('/api/convert')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ category: 'length', fromUnit: 'meter', toUnit: 'kilometer', value: 'abc' });
    expect(res.status).toBe(400);
  });

  test('returns 401 without token', async () => {
    const res = await request(app)
      .post('/api/convert')
      .send({ category: 'length', fromUnit: 'meter', toUnit: 'kilometer', value: 1 });
    expect(res.status).toBe(401);
  });
});

// ─── SEARCH ──────────────────────────────────────────────────────────────────
describe('GET /api/search', () => {
  test('finds kilometer to centimeter', async () => {
    const res = await request(app)
      .get('/api/search?q=kilometer+to+centimeter')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(res.body.results.length).toBeGreaterThan(0);
  });

  test('is case-insensitive', async () => {
    const res = await request(app)
      .get('/api/search?q=Kilometer+To+Centimeter')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(200);
    expect(res.body.results.length).toBeGreaterThan(0);
  });

  test('returns 400 for empty query', async () => {
    const res = await request(app)
      .get('/api/search')
      .set('Authorization', `Bearer ${jwtToken}`);
    expect(res.status).toBe(400);
  });

  test('returns 401 without token', async () => {
    const res = await request(app).get('/api/search?q=meter');
    expect(res.status).toBe(401);
  });
});

// ─── NAVIGATE ────────────────────────────────────────────────────────────────
describe('POST /api/navigate', () => {
  test('resolves "from kilometers to meters"', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: 'from kilometers to meters' });
    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(true);
    expect(res.body.category).toBe('length');
    expect(res.body.fromUnit.key).toBe('kilometer');
    expect(res.body.toUnit.key).toBe('meter');
  });

  test('resolves "kilometer to meter"', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: 'kilometer to meter' });
    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(true);
    expect(res.body.fromUnit.key).toBe('kilometer');
    expect(res.body.toUnit.key).toBe('meter');
  });

  test('extracts numeric value from "5 km to miles"', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: '5 km to miles' });
    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(true);
    expect(res.body.extractedValue).toBe(5);
    expect(res.body.fromUnit.key).toBe('kilometer');
    expect(res.body.toUnit.key).toBe('mile');
  });

  test('handles case-insensitive query "Celsius To Fahrenheit"', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: 'Celsius To Fahrenheit' });
    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(true);
    expect(res.body.category).toBe('temperature');
  });

  test('Spanish alias "kilómetro a centímetro"', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: 'kilómetro a centímetro' });
    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(true);
    expect(res.body.fromUnit.key).toBe('kilometer');
    expect(res.body.toUnit.key).toBe('centimeter');
  });

  test('returns matched=false for unknown units', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({ query: 'parsec to angstrom' });
    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(false);
  });

  test('returns 400 when query field is missing', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send({});
    expect(res.status).toBe(400);
  });

  test('returns 401 without token', async () => {
    const res = await request(app)
      .post('/api/navigate')
      .send({ query: 'kilometer to meter' });
    expect(res.status).toBe(401);
  });
});

// ─── 404 ─────────────────────────────────────────────────────────────────────
describe('404 handler', () => {
  test('returns 404 for routes outside /api/', async () => {
    const res = await request(app).get('/totally-unknown-path');
    expect(res.status).toBe(404);
  });

  test('returns 401 for unknown /api/ routes (JWT middleware fires first)', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.status).toBe(401);
  });
});

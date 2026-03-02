/**
 * App: app.ts
 * Express application setup with middleware, routes, and OpenAPI documentation.
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './config/openapi';
import authRouter from './routers/authRouter';
import conversionRouter from './routers/conversionRouter';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allow Swagger UI
}));

// CORS
app.use(cors({
  origin: process.env['CORS_ORIGIN'] ?? 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// OpenAPI / Swagger docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// Routes
app.use('/api/auth', authRouter);
app.use('/api', conversionRouter);

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Route not found' });
});

export default app;

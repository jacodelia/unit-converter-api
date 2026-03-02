/**
 * Config: openapi.ts
 * OpenAPI 3.0 specification for the Unit Converter API.
 */
export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Unit Converter API',
    version: '1.0.0',
    description: 'RESTful API for unit conversions across Length, Temperature, Area, Volume, Weight and Time.',
    contact: {
      name: 'Unit Converter',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ConversionRequest: {
        type: 'object',
        required: ['category', 'fromUnit', 'toUnit', 'value'],
        properties: {
          category: {
            type: 'string',
            enum: ['length', 'temperature', 'area', 'volume', 'weight', 'time'],
          },
          fromUnit: { type: 'string' },
          toUnit: { type: 'string' },
          value: { type: 'number' },
        },
      },
      ConversionResult: {
        type: 'object',
        properties: {
          category: { type: 'string' },
          fromUnit: { type: 'string' },
          toUnit: { type: 'string' },
          fromValue: { type: 'number' },
          toValue: { type: 'number' },
          formula: { type: 'string' },
        },
      },
      AuthToken: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          expiresIn: { type: 'string' },
          tokenType: { type: 'string' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
      NavigateResult: {
        type: 'object',
        properties: {
          matched: { type: 'boolean' },
          category: { type: 'string', nullable: true },
          fromUnit: { type: 'object', nullable: true },
          toUnit: { type: 'object', nullable: true },
          extractedValue: { type: 'number', nullable: true },
          parsedQuery: { type: 'string' },
        },
      },
    },
  },
  paths: {
    '/api/auth/token': {
      post: {
        summary: 'Generate JWT Bearer token',
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  clientId: { type: 'string', example: 'my-app' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'JWT token issued',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/AuthToken' },
              },
            },
          },
        },
      },
    },
    '/api/categories': {
      get: {
        summary: 'Get all conversion categories',
        tags: ['Conversions'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'All categories and their units' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/categories/{category}': {
      get: {
        summary: 'Get units for a specific category',
        tags: ['Conversions'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'category',
            required: true,
            schema: {
              type: 'string',
              enum: ['length', 'temperature', 'area', 'volume', 'weight', 'time'],
            },
          },
        ],
        responses: {
          200: { description: 'Category info with units' },
          401: { description: 'Unauthorized' },
          404: { description: 'Category not found' },
        },
      },
    },
    '/api/convert': {
      post: {
        summary: 'Perform a unit conversion',
        tags: ['Conversions'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ConversionRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Conversion result',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ConversionResult' },
              },
            },
          },
          400: {
            description: 'Invalid request',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/search': {
      get: {
        summary: 'Search units by natural language query',
        tags: ['Conversions'],
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: 'query',
            name: 'q',
            required: true,
            schema: { type: 'string' },
            description: 'Query e.g. "kilometer to centimeter"',
          },
        ],
        responses: {
          200: { description: 'Search results' },
          400: { description: 'Missing query parameter' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/navigate': {
      post: {
        summary: 'Resolve a natural language query to a converter state',
        description:
          'Parses free-text such as "from kilometers to meters", "5 km to miles", ' +
          'or "kilómetro a centímetro" and returns the matched category, fromUnit, ' +
          'toUnit and an optional extracted numeric value so the frontend can ' +
          'navigate directly to the correct converter state.',
        tags: ['Conversions'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['query'],
                properties: {
                  query: {
                    type: 'string',
                    example: 'from kilometers to meters',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Navigation result (matched may be false when nothing was found)',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/NavigateResult' },
              },
            },
          },
          400: { description: 'Missing query field' },
          401: { description: 'Unauthorized' },
        },
      },
    },
  },
};

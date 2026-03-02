/**
 * Server: server.ts
 * Entry point - starts the HTTP server.
 */
import 'dotenv/config';
import app from './app';

const PORT = parseInt(process.env['PORT'] ?? '3001', 10);

app.listen(PORT, () => {
  console.log(`Unit Converter API running on http://localhost:${PORT}`);
  console.log(`OpenAPI docs available at http://localhost:${PORT}/api/docs`);
});

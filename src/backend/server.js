require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET environment variable is not set.');
  process.exit(1);
}

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// SPA fallback — serve index.html for any unmatched route
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

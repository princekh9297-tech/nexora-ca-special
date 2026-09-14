const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// Security-oriented headers suitable for the current self-contained HTML.
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
  next();
});

app.get('/health', (req, res) => {
  res.json({ ok: true, app: 'neXora : CA SPECIAL' });
});

app.use(express.static(ROOT, {
  index: 'index.html',
  extensions: ['html']
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`neXora : CA SPECIAL running on port ${PORT}`);
});

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Your index.html is in the repository root
const ROOT = __dirname;

app.disable('x-powered-by');

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  );
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  next();
});

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    app: 'neXora : CA SPECIAL'
  });
});

// Serve index.html and other files from repository root
app.use(express.static(ROOT, {
  index: 'index.html',
  extensions: ['html']
}));

// Express 5 compatible fallback
app.use((req, res) => {
  res.sendFile(path.join(ROOT, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`neXora : CA SPECIAL running on port ${PORT}`);
});

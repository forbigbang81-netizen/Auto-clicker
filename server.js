const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const url = require('url');
const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// Enable CORS for development
app.use(cors());

// Proxy all requests to target URL
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://www.youtube.com', // Default target (changeable)
    changeOrigin: true,
    pathRewrite: { '^/': '' },
    secure: true,
    logLevel: 'error',
    onProxyReq: (proxyReq, req, res) => {
      const targetUrl = req.query.url;
      if (targetUrl) {
        proxyReq.setHeader('Host', new URL(targetUrl).host);
      }
    },
  })
);

// Handle direct URL requests (e.g., /?url=https://youtube.com)
app.get('/', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Error: No URL provided. Use ?url=https://example.com');
  }

  try {
    const parsedUrl = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return res.status(400).send('Error: Only HTTP/HTTPS URLs allowed');
    }
  } catch (e) {
    return res.status(400).send('Error: Invalid URL format');
  }

  // Forward to proxy middleware
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    secure: true,
  })(req, res, () => {});
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log([PROXY] Running on port ${PORT} (HTTPS recommended));
});
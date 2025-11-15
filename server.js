// server.js — clean version with strong .env debug
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// --- DEBUG: show paths ---
console.log('DEBUG: process.cwd() =', process.cwd());
console.log('DEBUG: __dirname =', __dirname);

// --- Load .env from backend root ---
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);
console.log('DEBUG: looking for .env at =', envPath, 'exists?', envExists);

if (envExists) {
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('DEBUG: dotenv error while parsing .env:', result.error);
  } else {
    console.log('DEBUG: dotenv loaded keys =', Object.keys(result.parsed || {}));
  }
} else {
  console.error('FATAL: .env file not found at', envPath);
}

// --- Log env values (for debugging only) ---
console.log('DEBUG: PORT =', process.env.PORT);
console.log('DEBUG: MONGO_URI =', process.env.MONGO_URI);
console.log('DEBUG: JWT_SECRET set? =', !!process.env.JWT_SECRET);

// If MONGO_URI missing, warn loudly but don’t crash app immediately
if (!process.env.MONGO_URI) {
  console.error('FATAL: MONGO_URI is undefined. Check your .env file.');
}

// --- DB connect (uses MONGO_URI from process.env) ---
const connectDB = require('./config/db');
connectDB();

// --- Express app setup ---
const app = express();

// CORS (allow all for dev)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.options('*', cors());

// JSON parser
app.use(express.json());

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

// Health check
app.get('/', (req, res) => res.send('EaseDrive API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port', PORT));

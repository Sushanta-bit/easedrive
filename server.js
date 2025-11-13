// server.js — CORS-friendly minimal version
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

console.log('DEBUG: MONGO_URI=', process.env.MONGO_URI);

// create express app
const app = express();

// --- CORS (allow all origins for development/testing) ---
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// make sure preflight OPTIONS requests are handled
app.options('*', cors());

// JSON body parser
app.use(express.json());

// serve static 'public' if exists
app.use(express.static(path.join(__dirname, 'public')));

// connect DB (unchanged)
const connectDB = require('./config/db');
connectDB();

// routes (after CORS and body parser)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/feedbacks', require('./routes/feedbacks'));

// simple root health check
app.get('/', (req, res) => res.send('EaseDrive API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server started on port', PORT));


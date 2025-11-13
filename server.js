const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');


console.log('DEBUG: MONGO_URI=', process.env.MONGO_URI);
const connectDB = require('./config/db');
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
// serve static 'public' if exists
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/feedbacks', require('./routes/feedbacks'));
//app.get('/', (req,res)=> res.send('EaseDrive API running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server started on port', PORT));

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
// create booking (protected)
router.post('/', auth, async (req,res)=>{
  const payload = req.body;
  // require driverId, pickup, dest
  if(!payload.driverId || !payload.pickup || !payload.dest) return res.status(400).json({ message:'Missing booking fields' });
  const b = new Booking({ ...payload, userId: req.user._id, driverName: payload.driverName || '' });
  await b.save();
  res.json(b);
});
// list bookings for logged user (protected)
router.get('/', auth, async (req,res)=>{
  const list = await Booking.find({ userId: req.user._id }).sort({ createdAt:-1 }).limit(50);
  res.json(list);
});
module.exports = router;

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const auth = require('../middleware/auth');
router.post('/', auth, async (req,res)=>{
  const { driverId, rating, comment } = req.body;
  if(!driverId || !rating) return res.status(400).json({ message:'Missing fields' });
  const f = new Feedback({ driverId, rating, comment, userId: req.user._id });
  await f.save();
  res.json(f);
});
router.get('/driver/:id', async (req,res)=>{
  const list = await Feedback.find({ driverId: req.params.id }).sort({ createdAt:-1 }).limit(50);
  res.json(list);
});
module.exports = router;

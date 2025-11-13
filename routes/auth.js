const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// register
router.post('/register', async (req,res)=>{
  const { name, email, phone, password } = req.body;
  if(!name || (!email && !phone) || !password) return res.status(400).json({ message:'Missing fields' });
  const exists = await User.findOne({ $or:[{email},{phone}] });
  if(exists) return res.status(400).json({ message:'User exists' });
  const u = new User({ name, email, phone });
  await u.setPassword(password);
  await u.save();
  res.json({ message:'Registered' });
});
// login
router.post('/login', async (req,res)=>{
  const { emailOrPhone, password } = req.body;
  if(!emailOrPhone || !password) return res.status(400).json({ message:'Missing' });
  const user = await User.findOne({ $or:[{ email: emailOrPhone }, { phone: emailOrPhone }] });
  if(user){
    const ok = await user.comparePassword(password);
    if(!ok) return res.status(400).json({ message:'Invalid credentials' });
    const token = jwt.sign({ id:user._id, type:user.type }, process.env.JWT_SECRET || 'dev', { expiresIn:'7d' });
    return res.json({ token, user:{ id:user._id, name:user.name, email:user.email, phone:user.phone, type:user.type } });
  }
  return res.status(400).json({ message:'User not found' });
});
// me
const auth = require('../middleware/auth');
router.get('/me', auth, (req,res)=> res.json(req.user));
module.exports = router;

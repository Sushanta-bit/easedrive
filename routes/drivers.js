const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
// list drivers
router.get('/', async (req,res)=>{
  const list = await Driver.find().limit(100);
  res.json(list);
});
// create driver (mock)
router.post('/', async (req,res)=>{
  const { name, phone, license, vehicle, vehicleType } = req.body;
  const d = new Driver({ name, phone, license, vehicle, vehicleType });
  await d.save();
  res.json(d);
});
module.exports = router;

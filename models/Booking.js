const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  driverId:{ type:mongoose.Schema.Types.ObjectId, ref:'Driver', required:true },
  driverName:String,
  userId:{ type:mongoose.Schema.Types.ObjectId, ref:'User' },
  pickup:String,
  dest:String,
  date:String,
  time:String,
  vehicleType:String,
  fare:Number,
  duration:{type:String, default:'onetime'},
  status:{type:String, enum:['pending','confirmed','cancelled'], default:'pending'},
  paid:{type:Boolean, default:false},
  createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Booking', BookingSchema);

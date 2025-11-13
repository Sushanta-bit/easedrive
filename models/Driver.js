const mongoose = require('mongoose');
const DriverSchema = new mongoose.Schema({
  name:{type:String, required:true},
  phone:{type:String, required:true, index:true},
  license:String,
  vehicle:String,
  vehicleType:{type:String, enum:['auto','micro','sedan','prime'], default:'micro'},
  verified:{type:Boolean, default:false},
  rating:{type:Number, default:4.5},
  avail:{type:Boolean, default:true},
  createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Driver', DriverSchema);

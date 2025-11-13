const mongoose = require('mongoose');
const FeedbackSchema = new mongoose.Schema({
  driverId:{ type:mongoose.Schema.Types.ObjectId, ref:'Driver', required:true },
  userId:{ type:mongoose.Schema.Types.ObjectId, ref:'User' },
  rating:{ type:Number, required:true },
  comment:String,
  createdAt:{ type:Date, default:Date.now }
});
module.exports = mongoose.model('Feedback', FeedbackSchema);

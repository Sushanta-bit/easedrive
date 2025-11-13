const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: { type:String, required:true },
  email: { type:String, lowercase:true, index:true },
  phone: { type:String, index:true },
  passHash: { type:String, required:true },
  type: { type:String, enum:['user','driver'], default:'user' },
  createdAt:{ type:Date, default:Date.now }
});
UserSchema.methods.setPassword = async function(p){
  const s = await bcrypt.genSalt(10);
  this.passHash = await bcrypt.hash(p,s);
};
UserSchema.methods.comparePassword = function(p){ return bcrypt.compare(p, this.passHash); };
module.exports = mongoose.model('User', UserSchema);

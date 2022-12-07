const mongoose = require("mongoose");
const { Schema } = mongoose;
const joinSchema = Schema({ 
  name:String,
  email:String,
  dob:Date,
  gender:String,
  phone:String,
  address:String,
  city:String,
  state:String,
  bloodgroup:String,
  currentcity:String,
  category:Array,
  whyjoin:String,
  date: String,
  time:String,
  active:Boolean
});

module.exports = mongoose.model("join_us", joinSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  role: { 
    type: String, 
    enum: ['client', 'freelancer'],
    default: 'freelancer' 
  }
},{timestamps:true})

export const User = new mongoose.model("User", userSchema)
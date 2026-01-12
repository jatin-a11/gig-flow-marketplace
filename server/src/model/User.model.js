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
    enum: ['client', 'freelancer'], // Sirf ye do options allow honge
    default: 'freelancer' // Default role
  }
},{timestamps:true})

export const User = new mongoose.model("User", userSchema)
import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  gigId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required:true
  },
  freelancerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  message:{
    type:String,
    required:true
  },
  bidAmount:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    enum:['hired','rejected','pending'],
    default:'pending'
  }

},{timestamps:true})

export const Bid = new mongoose.model("Bid", bidSchema)
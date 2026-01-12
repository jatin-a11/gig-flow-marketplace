import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  bids: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Bid'
}],
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  budget:{
    type:Number,
    required:true
  },
  ownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
  },
  status:{
    type:String,
    enum:['open', 'assigned'],
    default:'open'
  }
},{timestamps:true})

export const Gig = new mongoose.model("Gig", gigSchema)
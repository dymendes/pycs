import mongoose from "mongoose"

const comments = mongoose.Schema({
  image: { 
    type: mongoose.Types.ObjectId, 
    require: true 
  },
  user: { 
    type: mongoose.Types.ObjectId, 
    require: true 
  },
  text: { 
    type: String, 
    require: true 
  }
})

export default comments
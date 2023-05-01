import mongoose from "mongoose"

const tokens = mongoose.Schema({
  user: { 
    type: mongoose.Types.ObjectId, 
    require: true 
  },
  token: { 
    type: String, 
    require: true 
  }
})

export default tokens
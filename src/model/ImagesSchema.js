import mongoose from "mongoose"

const images = new mongoose.Schema({
  user: { 
    type: mongoose.Types.ObjectId, 
    require: true 
  },
  title: { 
    type: String, 
    require: true 
  },
  description: { 
    type: String, 
    require: false 
  },
  filename: {
    original: { 
      type: String, 
      require: true 
    },
    system: { 
      type: String, 
      require: true 
    }
  }
})

export default images
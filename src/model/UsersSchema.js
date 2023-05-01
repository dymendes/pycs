import mongoose from "mongoose"

const users = new mongoose.Schema({
  username: { 
    type: String, 
    require: true 
  },
  email: { 
    type: String, 
    require: true 
  },
  password: { 
    type: String, 
    require: true 
  },
  admin: { 
    type: Boolean, 
    default: false, 
    require: true
  }
})

export default users
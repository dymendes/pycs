import mongoose from "mongoose"

import TokensSchema from "../model/TokensSchema.js"

const tokens = mongoose.model("tokens", TokensSchema)

class UserService {
  async create(data) {
    try {
      await new tokens(data).save()
    } catch(error) {
      console.log(`There was an error registering a token: ${error}`)
    }
  }

  async findByToken(token) {
    try {
      return await tokens.findOne({ "token": token })
    } catch(error) {
      console.log(`There was an error searching for an token: ${error}`)
    }
  }

  async delete(user_id) {
    try {
      await tokens.deleteMany({ "user": user_id })
    } catch(error) {
      console.log(`There was an error deleting a token: ${error}`)
    }
  }
}

export default new UserService
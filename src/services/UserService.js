import mongoose from "mongoose"

import UsersSchema from "../model/UsersSchema.js"

const users = mongoose.model("users", UsersSchema)

class UserService {
  async signup(user_data) {
    try {
      await new users(user_data).save()
    } catch(error) {
      console.log(`There was an error registering a user: ${error}`)
    }
  }

  async findAll(req, res) {
    try {
      return await users.find()
    } catch (error) {
      console.log(`There was an error searching for an user: ${error}`)
    }
  }

  async findByEmail(email) {
    try {
      return await users.findOne({ "email": email })
    } catch(error) {
      console.log(`There was an error searching for an user: ${error}`)
    }
  }

  async findById(id) {
    try {
      return await users.findById(id)
    } catch(error) {
      console.log(`There was an error searching for an user: ${error}`)
    }
  }

  async update(id, data) {
    try {
      await users.updateOne({ "_id": id }, data)
    } catch(error) {
      console.log(`There was an error updating for an user: ${error}`)
    }   
  }

  async delete(id) {
    try {
      await users.deleteOne({ "_id": id })
    } catch(error) {
      console.log(`There was an error deleting a user: ${error}`)
    }
  }
}

export default new UserService
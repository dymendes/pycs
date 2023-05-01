import mongoose from "mongoose"

import CommentsSchema from "../model/CommentsSchema.js"

const comments = mongoose.model("comments", CommentsSchema)

class ImageService {
  async create(comment) {
    try {
      await new comments(comment).save()
    } catch(error) {
      console.log(`There was an error uploading a comment: ${error}`)
    }   
  }

  async findAll() {
    try {
      return await comments.find()
    } catch(error) {
      console.log(`There was an error searching for an comments: ${error}`)
    }   
  }

  async findById(id) {
    try {
      return await comments.findById(id)
    } catch(error) {
      console.log(`There was an error searching for an comment: ${error}`)
    }   
  }

  async update(id, data) {
    try {
      await comments.updateOne({ "_id": id }, data)
    } catch(error) {
      console.log(`There was an error updating for an comment: ${error}`)
    }   
  }

  async delete(id) {
    try {
      return await comments.findByIdAndDelete(id)
    } catch(error) {
      console.log(`There was an error deleting a comment: ${error}`)
    }
  }
}

export default new ImageService
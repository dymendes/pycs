import mongoose from "mongoose"

import ImagesSchema from "../model/ImagesSchema.js"
import CommentsSchema from "../model/CommentsSchema.js"

const images = mongoose.model("images", ImagesSchema)
const comments = mongoose.model("comments", CommentsSchema)

class ImageService {
  async upload(image) {
    try {
      await new images(image).save()
    } catch(error) {
      console.log(`There was an error uploading a image: ${error}`)
    }   
  }

  async findAll() {
    try {
      return await images.find()
    } catch(error) {
      console.log(`There was an error searching for an image: ${error}`)
    }   
  }

  async findById(id) {
    try {
      return await images.findById(id)
    } catch(error) {
      console.log(`There was an error searching for an image: ${error}`)
    }   
  }

  async update(id, data) {
    try {
      await images.updateOne({ "_id": id }, data)
    } catch(error) {
      console.log(`There was an error updating for an image: ${error}`)
    }   
  }

  async delete(id) {
    try {
      await images.deleteOne({ "_id": id })
      await comments.deleteMany().where({ "image": id })
    } catch(error) {
      console.log(`There was an error deleting a image: ${error}`)
    }
  }
}

export default new ImageService
import fs from "fs"

import ImageService from "../services/ImageService.js"

const ImageResponseData = (image, url) => {
  return {
    _id: image._id,
    user: image.user,
    title: image.title,
    description: image.description,
    name: image.filename.original,
    links: {
      file: `${url}/image/file/${image._id}`,
      self: `${url}/image/${image._id}`,
      delete: `${url}/image/${image._id}`
    }
  }
}

class ImageController {
  async upload(req, res) {
    const file = req.file
    const user_session = req.user

    const { title, description } = req.body
    const originalname = file.originalname

    const image = {
      user: user_session.id,
      title,
      description,
      filename: {
        original: originalname,
        system: file.filename
      }
    }

    await ImageService.upload(image)

    return res.status(200).json({ message: "Image uploaded successfully!" })
  }

  async findAll(req, res) {
    const url = process.env.API_URL

    const query = await ImageService.findAll()

    const images = []

    query.forEach(image => {
      images.push(ImageResponseData(image, url))
    })

    return res.status(200).json({ images, message: "Images fetched successfully!" })
  }

  async findById(req, res) {
    const url = process.env.API_URL

    const { id } = req.params

    const query = await ImageService.findById(id)

    const image = ImageResponseData(query, url)

    if(image === null) {
      return res.status(404).json({ message: "Image does not exist!" })
    }

    return res.status(200).json({ image, message: "Image fetched successfully!" })
  }

  async update(req, res) {
    const { id } = req.params
    const { title, description } = req.body
    const user_session = req.user

    const image_data = {
      title,
      description
    }

    const image = await ImageService.findById(id)

    if(image === null) {
      return res.status(404).json({ message: "Image does not exist!" })
    }

    if(String(image.user) !== user_session.id && user_session.admin === false) {
      return res.status(403).json({ message: "User is not an admin and also does not own this image!" })
    }

    await ImageService.update(id, image_data)
    
    return res.status(200).json({ message: "Image updated successfully!" })
  }

  async delete(req, res) {
    const { id } = req.params
    const user_session = req.user

    const image = await ImageService.findById(id)

    if(!image) {
      return res.status(404).json({ message: "Image does not exist!" })
    }

    if(String(image.user) !== user_session.id && user_session.admin === false) {
      return res.status(403).json({ message: "User is not an admin and also does not own this image!" })
    }

    const image_src = process.env.UPLOADS_SRC + image.filename.system

    fs.unlinkSync(image_src)

    await ImageService.delete(image._id)

    return res.status(200).json({ message: "Image deleted successfully!" })
  }
}

export default new ImageController
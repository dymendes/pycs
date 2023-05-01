import express from "express"

import { upload } from "../config/multer.js"
import ImageController from "../controllers/ImageController.js"
import { authentication } from "../config/middleware.js"

export const ImageRouter = express.Router()

ImageRouter.post("/", authentication, upload.single("file"), ImageController.upload)

ImageRouter.get("/", ImageController.findAll)
ImageRouter.get("/:id", ImageController.findById)
ImageRouter.get("/file/:id", ImageController.findFile)

ImageRouter.put("/:id", authentication, ImageController.update)

ImageRouter.delete("/:id", authentication, ImageController.delete)
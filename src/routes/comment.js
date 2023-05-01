import express from "express"

import CommentController from "../controllers/CommentController.js"
import { authentication } from "../config/middleware.js"

export const CommentRouter = express.Router()

CommentRouter.post("/:id", authentication, CommentController.create)

CommentRouter.get("/", CommentController.findAll)

CommentRouter.put("/:id", authentication, CommentController.update)

CommentRouter.delete("/:id", authentication, CommentController.delete)
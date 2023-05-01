import express from "express"

import UserController from "../controllers/UserController.js"
import { authentication } from "../config/middleware.js"

export const UserRouter = express.Router()

UserRouter.post("/signup", UserController.signup)
UserRouter.post("/signin", UserController.signin)

UserRouter.get("/", UserController.findAll)
UserRouter.get("/:id", UserController.findById)

UserRouter.put("/:id", authentication, UserController.update)

UserRouter.delete("/:id", authentication, UserController.logout)
UserRouter.delete("/:id", authentication, UserController.delete)
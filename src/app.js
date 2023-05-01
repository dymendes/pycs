import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import { UserRouter } from "./routes/user.js"
import { ImageRouter } from "./routes/image.js"
import { CommentRouter } from "./routes/comment.js"

export const app = express()

dotenv.config()

mongoose.set("strictQuery", false)

mongoose.connect(process.env.DATABASE_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/user", UserRouter)
app.use("/image", ImageRouter)
app.use("/comment", CommentRouter)
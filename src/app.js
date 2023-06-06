import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url'

import { UserRouter } from "./routes/user.js"
import { ImageRouter } from "./routes/image.js"
import { CommentRouter } from "./routes/comment.js"

export const app = express()

/* Configurando dirname */

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

/* Configurando dirname */

dotenv.config()

mongoose.set("strictQuery", false)

mongoose.connect(process.env.DATABASE_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

app.use(cors())

app.use("/file", express.static(path.resolve(__dirname, "uploads")))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/user", UserRouter)
app.use("/image", ImageRouter)
app.use("/comment", CommentRouter)
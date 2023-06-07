import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) => {
    const date = Date.now()
    const extension = path.extname(file.originalname)

    const filename = `${date}${extension}`

    cb(null, filename)
  }
})

export const upload = multer({ storage })
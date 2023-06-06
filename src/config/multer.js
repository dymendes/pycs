import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, process.env.UPLOADS_SRC),
  filename: (req, file, cb) => {
    const date = new Date().toISOString()
    const extension = path.extname(file.originalname)

    const filename = `${date}${extension}`

    cb(null, filename)
  }
})

export const upload = multer({ storage })
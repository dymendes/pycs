import CommentService from "../services/CommentService.js"

class CommentController {
  async create(req, res) {
    const imageID = req.params.id
    const userID = req.user.id
    const { text } = req.body

    const comment = {
      image: imageID,
      user: userID,
      text
    }

    await CommentService.create(comment)

    return res.status(200).json({ message: "Comment created successfully!" })
  }

  async findAll(req, res) {
    const comments = await CommentService.findAll()

    return res.status(200).json({ comments, message: "Comments fetched successfully!" })
  }

  async update(req, res) {
    const { id } = req.params
    const { text } = req.body
    const user_session = req.user

    const data = {
      text
    }

    const comment = await CommentService.findById(id)

    if(comment === null) {
      return res.status(404).json({ message: "Comment does not exist!" })
    }

    if(String(comment.user) !== user_session.id && user_session.admin === false) {
      return res.status(403).json({ message: "The user is not an administrator and does not have this comment either!" })
    }

    await CommentService.update(id, data)
    
    return res.status(200).json({ message: "Comment updated successfully!" })
  }

  async delete(req, res) {
    const { id } = req.params
    const user_session = req.user

    const comment = await CommentService.delete(id)

    if(!comment) {
      return res.status(404).json({ message: "Comment does not exist!" })
    }

    if(String(comment.user) !== user_session.id && user_session.admin === false) {
      return res.status(403).json({ message: "The user is not an administrator and does not have this comment either!" })
    }
    
    return res.status(200).json({ message: "Comment deleted successfully!" })
  }
}

export default new CommentController
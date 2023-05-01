import jwt from "jsonwebtoken"
import TokenService from "../services/TokenService.js"

export const authentication = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]
  const secret = process.env.JWT_SECRET

  if(!token) {
    return res.status(401).json({ message: "Token does not exist." })
  }

  const token_search = await TokenService.findByToken(token)

  if(!token_search) {
    return res.status(401).json({ message: "Invalid token." })
  }

  jwt.verify(token, secret, (error, user_session) => {
    if(error) {
      return res.status(401).json({ message: "Invalid token." })
    }
      
    req.user = user_session; next()
  })
}
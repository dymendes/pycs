import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import UserService from "../services/UserService.js"
import TokenService from "../services/TokenService.js"
import { validate } from "../controllers/UserDataValidate.js"

const UserResponseData = user => {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    admin: user.admin
  }
}

export const TokenCreate = async user => {
  const secret = process.env.JWT_SECRET

  const token = jwt.sign({
    id: user._id, 
    username: user.username, 
    email: user.email, 
    password: user.password, 
    admin: user.admin 
  }, 
  secret, { 
    expiresIn: "24h" 
  })

  const token_data = {
    user: user._id, 
    token
  }

  await TokenService.create(token_data)

  return token
}

const update = {
  user: async (res, user_search, username, password) => {
    try {
      const user_data = {
        username,
        password
      }
  
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
  
      user_data.password = hash
  
      await UserService.update(user_search.id, user_data)
  
      await TokenService.delete(user_search.id)
  
      const token = await TokenCreate(user_search)
      
      return res.status(200).json({ token, message: "User updated successfully!" }) 
    } catch (error) {
      console.log(`There was an error updating for an user: ${error}`)
    }
  },
  admin: async (res, user_search, username, admin) => {
    try {
      const user_data = {
        username,
        admin
      }
  
      await UserService.update(user_search.id, user_data)
  
      await TokenService.delete(user_search.id)
      
      return res.status(200).json({ message: "User updated successfully!" })
    } catch(error) {
      console.log(`There was an error updating for an user: ${error}`)
    }
  }
}

class UserController {
  async signup(req, res) {
    const { username, email, password } = req.body
    
    if(!validate.username(username) || !validate.email(email) || !validate.password(password)) {
      return res.status(400).json({ message: "Invalid credentials." })
    }

    if(await UserService.findByEmail(email) !== null) {
      return res.status(406).json({ message: "Existing email." })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await UserService.signup({ 
      username, 
      email, 
      password: hash,
      admin: false 
    })

    return res.status(200).json({ message: "User registered successfully!" })
  }

  async signin(req, res) {
    const { email, password } = req.body

    const user_search = await UserService.findByEmail(email)

    if(user_search === null) {
      return res.status(403).json({ message: "Email does not exist!" })
    }

    const password_compare = bcrypt.compare(password, user_search.password)

    if(!password_compare) {
      return res.status(403).json({ message: "Incorrect password!" })
    }

    await TokenService.delete(user_search._id)

    const token = await TokenCreate(user_search)

    return res.status(200).json({ token, message: "User successfully authenticated!" })
  }

  async findAll(req, res) {
    const query = await UserService.findAll()

    const users = []

    query.forEach(user => {
      users.push(UserResponseData(user))
    })

    return res.status(200).json({ users, message: "Users fetched successfully!" })
  }

  async findById(req, res) {
    const { id } = req.params

    const query = await UserService.findById(id)
    
    if(!query) {
      return res.status(404).json({ message: "User does not exist!" })
    }

    const user = UserResponseData(query)

    return res.status(200).json({ user, message: "User fetched successfully!" })
  }

  async update(req, res) {
    const { id } = req.params
    const { username, password, admin } = req.body
    const user_session = req.user

    const user_search = await UserService.findById(id)

    if(user_search === null) {
      return res.status(404).json({ message: "User does not exist!" })
    }

    if(String(user_search._id) === user_session.id) {
      return await update.user(res, user_search, username, password)
    }

    if(user_session.admin === true) {
      return await update.admin(res, user_search, username, admin)
    }
    
    return res.status(403).json({ message: "User is not an admin and also does not own this profile!" })
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const user_session = req.user

      const user_search = await UserService.findById(id)

      if(!user_search) return res.status(404).json({ message: "User does not exist!" })

      if(String(user_search._id) !== user_session.id && user_session.admin === false) {
        return res.status(403).json({ message: "User is not an admin and also does not own this profile!" })
      }

      await UserService.delete(user_search._id)

      await TokenService.delete(user_search._id)

      return res.status(200).json({ message: "User deleted successfully!" })
    } catch (error) {
      console.log(`There was an error deleting a user: ${error}`)
    }
  }

  async logout(req, res) {
    try {
      const user_session = req.user

      await TokenService.delete(user_session.id)
  
      return res.status(200).json({ message: "User logged out successfully!" })
    } catch (error) {
      console.log(`An error occurred while logging out a user: ${error}`)
    }
  }
}

export default new UserController
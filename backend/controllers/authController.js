const User = require('../models/User')
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET



const register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exist'})
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const newUser = await User.create({
      username,
      email,
      passwordHash
    })

    const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message})
  }

}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash)
    if (!passwordMatch) {
      return res.status(400).json({ message: 'invalidCredentials' })
    }

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' })
    res.json({ token, isAdmin: user.isAdmin })
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

module.exports = {
  register,
  login
}
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User')

dotenv.config()

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken
    if (!token) {
      return res.status(401).json({ message: 'no token provided'})
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'user not found'})
    }

    req.user = user
    next()
  } catch (error) {
    console.log('failed to verificate token', error)
    return res.status(403).json({ message: 'invalid or expired token' })
  }
}

const adminRoute = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next()
  }
  return res.status(403).json({ message: "Access denied - Admin only" })
}

module.exports = {
  verifyToken,
  adminRoute
}
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })

    req.user = {          // 👈 THIS IS THE KEY
      id: decoded.id,
      isAdmin: decoded.isAdmin
    }
    next()
  })
}

const adminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(403).json({ message: "Access denied - Admins only" })
  }
}

// module.exports = adminRoute


module.exports = {
  verifyToken,
  adminRoute
}
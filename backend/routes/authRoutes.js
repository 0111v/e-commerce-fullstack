const express = require('express')
const router = express.Router()
const { register, login, getProfile, logout } = require('../controllers/authController')
const { verifyToken } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/profile', verifyToken, getProfile)
router.post('/logout', logout)

// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')

// dotenv.config()

// const adminUser = {
//   username: 'admin',
//   passwordHash: '$2b$10$BE8j5L8dav1VhmlBxtE1MeucoAkpimQc1nkpdFh8LUFctnefq/QB6'
// }

// // $2b$10$IC1m.kSF0MXeIHJo1uUnI.k5W4QaIBFF2ucmQPpaN2IRJXzM01fBq

// const JWT_SECRET = process.env.JWT_SECRET

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body

//   if (username !== adminUser.username) {
//     return res.status(401).json({ message: 'invalid credentials'})
//   }

//   const passwordMatch = await bcrypt.compare(password, adminUser.passwordHash)
//   if (!passwordMatch) {
//     return res.status(401).json({ message: 'invalid credentials'})
//   }

//   const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' })

//   res.json({ token })
// })

module.exports = router
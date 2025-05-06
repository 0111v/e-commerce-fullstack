const User = require('../models/User')
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const createToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
  return { accessToken, refreshToken }
}

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  })
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

const register = async (req, res) => {
  try {
    const { username, email, password, } = req.body
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'all fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "email already in use" })
    }

    const newUser = await User.create({ username, email, password })
    const { accessToken, refreshToken } = createToken(newUser._id)
    setCookies(res, accessToken, refreshToken)

    return res.status(201).json({ 
      message: 'user registered successfully',
      user: { 
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    })
  } catch (error) {
    console.log('error creating new user', error)
    return res.status(500).json({ message: 'failed to created a new user'})
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required'})
    }

    const user = await User.findOne({ email })
    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ message: 'invalid credentials' })
    }

    const { accessToken, refreshToken } = createToken(user._id)
    setCookies(res, accessToken, refreshToken)

    return res.json({
      message: 'logged in successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.log('failed to login', error)
    return res.status(500).json({ message: 'failed to login'})
  }
}

const getProfile = (req, res) => {
  if(!req.user) {
    return res.status(401).json({ message: 'unauthorized'})
  }

  return res.status(200).json({
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    }
  })
}

const logout = (req, res) => {
  res.clearCookie('accessToken')
  res.clearCookie('refreshToken')

  return res.status(200).json({ message: 'logout successfully'})
}

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res.status(401).json({ message: 'no refresh token provided' })
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'user does not exist'})
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    })

    return res.json({ message: 'access token refreshed'})
  } catch (error) {
    console.log('failed to refresh token', error)
    return res.status(403).json({ message: 'invalid or expired refresh token' })
  }
}

module.exports = {
  register,
  login,
  getProfile,
  logout,
  refreshToken
}



// const register = async (req, res) => {
//   const { username, email, password } = req.body

//   try {
//     const existingUser = await User.findOne({ email })
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exist'})
//     }

//     const passwordHash = await bcrypt.hash(password, 10)
    
//     const newUser = await User.create({
//       username,
//       email,
//       passwordHash
//     })

//     const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, JWT_SECRET, { expiresIn: '1h' })
//     res.status(201).json({ token })
//   } catch (error) {
//     res.status(500).json({ error: error.message})
//   }

// }

// const login = async (req, res) => {
//   const { email, password } = req.body

//   try {
//     const user = await User.findOne({ email })
//     if (!user) {
//       return res.status(400).json({ message: 'invalid credentials' })
//     }

//     const passwordMatch = await bcrypt.compare(password, user.passwordHash)
//     if (!passwordMatch) {
//       return res.status(400).json({ message: 'invalidCredentials' })
//     }

//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' })
//     res.json({ token, isAdmin: user.isAdmin })
//   } catch (error) {
//     res.status(500).json({ message: error.message})
//   }
// }


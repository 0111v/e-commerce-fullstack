const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')

const productsRoute = require('./routes/products')
const authRoutes = require('./routes/auth')

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('🟢 Connected to MongoDB Atlas'))
.catch((err) => console.error('🔴 MongoDB Atlas connection error:', err));

app.use(express.json())
app.use('/products', productsRoute)
app.use(authRoutes)

// app.get('/', (req, res) => {
//   res.send('API is working')
// })

app.listen(port, () => {
  console.log(`server is running at the port ${port}`)
})

const dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(dirname, "/frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"))
  })
}



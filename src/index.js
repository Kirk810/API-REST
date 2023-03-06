const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connect = require('./utils/connect')
const { configCloudinary } = require('./middlewares/files.middlewares')
const ModelsRoutes = require('./api/routes/models.route')
const BrandsRoutes = require('./api/routes/brands.route')
dotenv.config()

const PORT = process.env.PORT

configCloudinary()

const server = express()
connect()
server.use(
  cors({
    origin: '*',
    credentials: true,
  })
)

server.use('/api/v1/brands', BrandsRoutes)
server.use('/api/v1/models', ModelsRoutes)

server.use('*', (req, res, next) => {
  const error = new Error('Route not found')
  return next(error)
})

server.disabled('x-powered-by')

server.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}')
})

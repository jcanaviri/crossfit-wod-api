const express = require('express')
const morgan = require('morgan')

// Import the v1 Router
const v1WorkoutRouter = require('./v1/routes/workoutRoutes')
const v1RecordRouter = require('./v1/routes/recordRoutes')

const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/workouts', v1WorkoutRouter)
app.use('/api/v1/records', v1RecordRouter)

app.listen(PORT, () => {
  console.log(`🚀 API running on port: ${PORT}.`)
  V1SwaggerDocs(app, PORT)
})

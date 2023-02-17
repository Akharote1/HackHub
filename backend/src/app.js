import dotenv from 'dotenv'
dotenv.config()

import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import HackathonRouter from './routes/Hackathon.js'
import UserRouter from './routes/User.js'
import TeamRouter from './routes/Team.js'

const app = express()
const port = process.env.PORT || 17120

app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())

app.use('/hackathon', HackathonRouter)
app.use('/user', UserRouter)
app.use('/team', TeamRouter)

app.listen(port, () => {
  console.log(`HackHub Server listening on port ${port}`)
})
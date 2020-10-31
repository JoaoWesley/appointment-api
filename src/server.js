import express from 'express'
import variables from './config/envVariablesConfig'
import bodyParser from 'body-parser'
import eventRoute from './routes/api/eventRoute'
import slotRoute from './routes/api/slotRoute'
import cors from 'cors'

const app = express()

app.use(cors({
    credentials: true,
    origin: variables.CLIENT_BASE_URL,
    methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
  }
))
app.use(bodyParser.json())

app.use('/event', eventRoute)
app.use('/slot', slotRoute)

app.get('/', (req, res) => {
  res.json({ ok: 'true' })
})

app.listen(process.env.PORT || variables.PORT)

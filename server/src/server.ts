import cors from 'cors'
import express, { Request, Response } from 'express'
import config from './config'
import { admin, login, register, status, vacation } from './routers'

const app = express()
app.use(express.json())

app.use(cors())

app.use(register)
app.use(status)
app.use(login)
app.use(vacation)
app.use(admin)

app.use((req: Request, res: Response) => {
  try {
    res.status(404).send(`Resource ${req.url} not supported!`)
  } catch (error) {
    res.status(500)
  }
})

export default () =>
  app.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}`)
  )

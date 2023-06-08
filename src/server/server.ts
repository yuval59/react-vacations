import express, { Request, Response } from 'express'
import config from './config'
import { ROUTES } from './constants'
import { login, register, status, vacation } from './routers'

const app = express()
app.use(express.json())

app.use(register)
app.use(status)
app.use(login)
app.use(ROUTES.VACATION, vacation)

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

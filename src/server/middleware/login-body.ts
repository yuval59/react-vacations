import { NextFunction, Request, Response } from 'express'
import { loginBodyShape } from '../utils'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    loginBodyShape.parse(req.body)

    next()
  } catch (err: unknown) {
    res.sendStatus(400)
  }
}

import { NextFunction, Request, Response } from 'express'
import { ROLES } from '../constants'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (res.locals.role != ROLES.ADMIN) return res.sendStatus(401)
    next()
  } catch (err) {
    return res.sendStatus(500)
  }
}

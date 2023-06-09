import { genSalt, hash } from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const salt = await genSalt()
    res.locals.password = await hash(req.body.password, salt)

    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

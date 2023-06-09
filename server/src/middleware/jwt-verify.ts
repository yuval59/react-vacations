import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { z } from 'zod'
import config from '../config'

const jwtDataShape = z.object({
  username: z.string(),
  role: z.string(),
  id: z.string(),
  iat: z.number(),
  exp: z.number(),
})

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return res.sendStatus(400)

    verify(
      req.headers.authorization.replace('Bearer ', ''),
      config.JWT_SECRET,
      (err, decoded) => {
        if (err) return res.status(401).json(err)

        const { exp, iat, id, role, username } = jwtDataShape.parse(decoded)

        res.locals.exp = exp
        res.locals.iat = iat
        res.locals.id = id
        res.locals.role = role
        res.locals.username = username

        next()
      }
    )
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

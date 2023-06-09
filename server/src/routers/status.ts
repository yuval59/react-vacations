import { Request, Response, Router } from 'express'
import { ROUTES } from '../constants'
import { jwtVerify } from '../middleware'

const router = Router()

router.get(ROUTES.STATUS, [jwtVerify], (req: Request, res: Response) => {
  console.log('Status OK')

  res.status(200).send(`${res.locals.role} is pretty COOLSIES`)
})

export default router

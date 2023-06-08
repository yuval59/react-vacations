import { Request, Response, Router } from 'express'
import { ROUTES } from '../constants'
import { jwtVerify } from '../middleware'

const router = Router()

router.post(ROUTES.VACATION_FOLLOW, [jwtVerify])

export default router

async function handleFollow(req: Request, res: Response) {}

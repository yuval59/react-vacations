import { Request, Response, Router } from 'express'
import { z } from 'zod'
import { DATABASE_ERRORS, ROUTES } from '../constants'
import { addFollower, removeFollower } from '../db/dal'
import { adminOnly, jwtVerify } from '../middleware'

const router = Router()

router.get(ROUTES.VACATIONS, [jwtVerify], getVacations)

router.post(ROUTES.VACATION_FOLLOW, [jwtVerify], addFollow)
router.delete(ROUTES.VACATION_FOLLOW, [jwtVerify], deleteFollow)

export default router

async function getVacations(req: Request, res: Response) {
  const { id, role } = res.locals
  res.status(200).send(role)
}

async function addFollow(req: Request, res: Response) {
  try {
    var vacationId = z.string().parse(req.query.id)
  } catch {
    return res.sendStatus(400)
  }

  try {
    await addFollower(res.locals.id, vacationId)

    res.sendStatus(200)
  } catch (err) {
    if (typeof err == 'string')
      switch (err) {
        case DATABASE_ERRORS.VACATION_NOT_FOUND_CODE:
          return res.status(404).send(DATABASE_ERRORS.VACATION_NOT_FOUND)
        case DATABASE_ERRORS.USER_NOT_FOUND_CODE:
          return res.status(404).send(DATABASE_ERRORS.USER_NOT_FOUND)
      }

    console.error(err)
    res.sendStatus(500)
  }
}

async function deleteFollow(req: Request, res: Response) {
  try {
    var vacationId = z.string().parse(req.query.id)
  } catch {
    return res.sendStatus(400)
  }

  try {
    await removeFollower(res.locals.id, vacationId)

    res.sendStatus(200)
  } catch (err) {
    if (typeof err == 'string')
      switch (err) {
        case DATABASE_ERRORS.VACATION_NOT_FOUND_CODE:
          return res.status(404).send(DATABASE_ERRORS.VACATION_NOT_FOUND)
        case DATABASE_ERRORS.USER_NOT_FOUND_CODE:
          return res.status(404).send(DATABASE_ERRORS.USER_NOT_FOUND)
      }

    console.error(err)
    res.sendStatus(500)
  }
}
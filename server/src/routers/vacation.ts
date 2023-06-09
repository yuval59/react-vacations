import { Request, Response, Router } from 'express'
import { z } from 'zod'
import { DATABASE_ERRORS, ROUTES } from '../constants'
import { addFollower, getAllVacations, removeFollower } from '../db/dal'
import { jwtVerify } from '../middleware'
import { objectOmit } from '../utils'

const router = Router()

router.get(ROUTES.VACATIONS, [jwtVerify], getVacations)

router.post(ROUTES.VACATION_FOLLOW, [jwtVerify], addFollow)
router.delete(ROUTES.VACATION_FOLLOW, [jwtVerify], deleteFollow)

export default router

async function getVacations(req: Request, res: Response) {
  try {
    const { id } = res.locals
    const allVacations = await getAllVacations()
    res.status(200).json(
      allVacations.map((vacation) => ({
        ...objectOmit(vacation, ['followers', 'id']),
        following: vacation.followers.some((user) => user.id == id),
      }))
    )
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

async function addFollow(req: Request, res: Response) {
  try {
    if (!req.query.id || typeof req.query.id != 'string')
      return res.sendStatus(400)

    await addFollower(res.locals.id, req.query.id)

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
    if (!req.query.id || typeof req.query.id != 'string')
      return res.sendStatus(400)

    await removeFollower(res.locals.id, req.query.id)

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

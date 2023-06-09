import { Request, Response, Router } from 'express'
import { z } from 'zod'
import { DATABASE_ERRORS, FORMATS, ROUTES } from '../constants'
import {
  addVacation,
  getAllVacations,
  removeVacation,
  updateVacation,
} from '../db/dal'
import {
  adminOnly,
  jwtVerify,
  verifyVacationCreationBody,
  verifyVacationUpdateBody,
} from '../middleware'
import { vacationCreationParams, vacationUpdateParams } from '../utils'

const router = Router()

router.get(ROUTES.VACATION_STATS, [jwtVerify, adminOnly], getVacationStats)

router.post(
  ROUTES.VACATIONS,
  [verifyVacationCreationBody, jwtVerify, adminOnly],
  handleVacationAdd
)

router.patch(
  ROUTES.VACATIONS,
  [verifyVacationUpdateBody, jwtVerify, adminOnly],
  handleVacationUpdate
)
router.delete(ROUTES.VACATIONS, [jwtVerify, adminOnly], handleVacationDelete)

async function getVacationStats(req: Request, res: Response) {
  try {
    const vacations = await getAllVacations()
    res.status(200).json(vacations)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

async function handleVacationAdd(req: Request, res: Response) {
  const creationParams = vacationCreationParams.parse(req.body)

  const formatted = {
    start_date: res.locals.day.start_date.format(FORMATS.MYSQL_DATE),
    end_date: res.locals.day.end_date.format(FORMATS.MYSQL_DATE),
  }

  try {
    const vacation = await addVacation({
      ...creationParams,
      ...formatted,
    })

    res.status(200).json(vacation)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

async function handleVacationUpdate(req: Request, res: Response) {
  const editParams = vacationUpdateParams.parse(req.body)

  const formatted: any = {}

  if (res.locals.day.start_date)
    formatted.start_date = res.locals.day.start_date.format(FORMATS.MYSQL_DATE)

  if (res.locals.day.end_date)
    formatted.end_date = res.locals.day.end_date.format(FORMATS.MYSQL_DATE)

  try {
    const vacation = await updateVacation({
      ...editParams,
      ...formatted,
    })

    res.status(200).json(vacation)
  } catch (err) {
    if (typeof err == 'string')
      switch (err) {
        case DATABASE_ERRORS.DATE_ERROR_CODE:
          return res.status(400).send(DATABASE_ERRORS.DATE_ERROR)
        case DATABASE_ERRORS.VACATION_NOT_FOUND_CODE:
          return res.status(404).send(DATABASE_ERRORS.VACATION_NOT_FOUND)
      }

    console.error(err)
    res.sendStatus(500)
  }
}

async function handleVacationDelete(req: Request, res: Response) {
  try {
    if (!req.query.id || typeof req.query.id != 'string')
      return res.sendStatus(400)

    await removeVacation(req.query.id)

    res.sendStatus(200)
  } catch (err) {
    if (typeof err == 'string')
      switch (err) {
        case DATABASE_ERRORS.VACATION_NOT_FOUND_CODE:
          return res.status(404).send(DATABASE_ERRORS.VACATION_NOT_FOUND)
      }

    console.error(err)
    res.sendStatus(500)
  }
}

export default router

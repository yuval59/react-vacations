import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { NextFunction, Request, Response } from 'express'
import { DATABASE_ERRORS } from '../constants'
import { vacationCreationParams, vacationUpdateParams } from '../utils'

dayjs.extend(isSameOrAfter)

export function verifyVacationCreationBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { end_date, start_date } = vacationCreationParams.parse(req.body)

    const day = {
      start_date: dayjs(start_date),
      end_date: dayjs(end_date),
    }

    if (!day.end_date.isSameOrAfter(start_date))
      return res.status(400).send(DATABASE_ERRORS.DATE_ERROR)

    res.locals.day = day
    next()
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
}

export function verifyVacationUpdateBody(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { end_date, start_date } = vacationUpdateParams.parse(req.body)

    const day = {
      start_date: start_date ? dayjs(start_date) : null,
      end_date: end_date ? dayjs(end_date) : null,
    }

    res.locals.day = day
    next()
  } catch {
    res.sendStatus(400)
  }
}

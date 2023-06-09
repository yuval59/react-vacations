import { NextFunction, Request, Response } from 'express'
import { PASSWORD_ERRORS } from '../constants'
import { getRegisterBodyErrorType, registerParams } from '../utils'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    registerParams.parse(req.body)

    next()
  } catch (err: unknown) {
    switch (getRegisterBodyErrorType(err)) {
      case 'PASSWORD_TOO_SHORT': {
        res.status(400).send(PASSWORD_ERRORS.PASSWORD_TOO_SHORT)
        break
      }

      case 'PASSWORD_TOO_LONG': {
        res.status(400).send(PASSWORD_ERRORS.PASSWORD_TOO_LONG)
        break
      }

      case 'PASSWORD_NO_LOWERCASE': {
        res.status(400).send(PASSWORD_ERRORS.PASSWORD_NO_LOWERCASE)
        break
      }

      case 'PASSWORD_NO_UPPERCASE': {
        res.status(400).send(PASSWORD_ERRORS.PASSWORD_NO_UPPERCASE)
        break
      }

      case 'PASSWORD_NO_DIGIT': {
        res.status(400).send(PASSWORD_ERRORS.PASSWORD_NO_DIGIT)
        break
      }

      case 'UNKNOWN': {
        res.sendStatus(400)
        break
      }
    }
  }
}

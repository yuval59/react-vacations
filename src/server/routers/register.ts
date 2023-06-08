import { Request, Response, Router } from 'express'
import { REGISTER_ERRORS, ROUTES } from '../constants'
import { addUser, doesUsernameExist } from '../db/dal'
import { passwordEncrypter, registerBody } from '../middleware'
import { jwtSign, registerParams } from '../utils'

const router = Router()

router.post(
  ROUTES.REGISTER,
  [registerBody, passwordEncrypter],
  handleRegistration
)

export default router

async function handleRegistration(req: Request, res: Response) {
  const params = registerParams.parse(req.body)

  if (await doesUsernameExist(params.username))
    return res.status(400).send(REGISTER_ERRORS.USERNAME_EXISTS)

  try {
    const newUser = await addUser({
      ...params,
      password: res.locals.password,
    })

    const accessToken = jwtSign({
      username: newUser.username,
      id: newUser.id,
      role: 'user',
    })

    return res.status(200).json({
      ...newUser,
      accessToken,
    })
  } catch (err: unknown) {
    console.error(err)
    return res.sendStatus(500)
  }
}

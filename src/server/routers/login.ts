import { compareSync } from 'bcrypt'
import { Request, Response, Router } from 'express'
import { LOGIN_ERRORS, ROUTES } from '../constants'
import { getUserByUsername } from '../db/dal'
import { loginBody } from '../middleware'
import { jwtSign, loginBodyShape } from '../utils'

const router = Router()

router.post(ROUTES.LOGIN, [loginBody], handleLogin)

export default router

async function handleLogin(req: Request, res: Response) {
  try {
    const { password, username } = loginBodyShape.parse(req.body)
    const user = await getUserByUsername(username)
    if (!user) return res.status(400).send(LOGIN_ERRORS.USER_NOT_FOUND)

    if (!compareSync(password, user.password))
      return res.status(401).send(LOGIN_ERRORS.INCORRECT_PASSWORD)

    const { id, is_admin } = user

    const accessToken = jwtSign({
      username,
      id,
      role: is_admin ? 'admin' : 'user',
    })

    res.status(200).json({ accessToken })
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
}

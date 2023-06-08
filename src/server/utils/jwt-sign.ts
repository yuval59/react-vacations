import { sign } from 'jsonwebtoken'
import config from '../config'
import { JWT_EXPIRATION } from '../constants'

type paramShape = {
  username: string
  role: string
  id: string
}

export default (params: paramShape) => {
  const { username, role, id } = params

  return sign({ username, role, id }, config.JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  })
}

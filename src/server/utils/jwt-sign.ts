import { sign } from 'jsonwebtoken'
import config from '../config'

type paramShape = {
  username: string
  role: string
  id: string
}

export default (params: paramShape) => {
  const { username, role, id } = params

  return sign({ username, role, id }, config.JWT_SECRET, {
    expiresIn: '20m',
  })
}

import { z } from 'zod'
import { PASSWORD_PARAMS } from '../constants'

const password = z
  .string()
  .min(PASSWORD_PARAMS.MIN_LENGTH, {
    message: 'PASSWORD_TOO_SHORT',
  })
  .max(PASSWORD_PARAMS.MAX_LENGTH, { message: 'PASSWORD_TOO_LONG' })
  .regex(RegExp('(?=.*[a-z])'), {
    message: 'PASSWORD_NO_LOWERCASE',
  })
  .regex(RegExp('(?=.*[A-Z])'), {
    message: 'PASSWORD_NO_UPPERCASE',
  })
  .regex(RegExp('(?=.*\\d)'), {
    message: 'PASSWORD_NO_DIGIT',
  })

export default z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: password,
})

import { z } from 'zod'
import { PASSWORD_ERRORS } from '../constants'

function asPasswordErrorKey(
  val: string
): asserts val is keyof typeof PASSWORD_ERRORS {
  if (!Object.keys(PASSWORD_ERRORS).includes(val)) throw ''
}

const passwordErrorShape = z.object({
  issues: z
    .array(
      z.object({
        message: z.string(),
      })
    )
    .nonempty(),
})

export default (err: unknown) => {
  try {
    const message = passwordErrorShape.parse(err).issues[0].message
    asPasswordErrorKey(message)

    return message
  } catch {
    return 'UNKNOWN'
  }
}

export const ROUTES = {
  STATUS: '/status',
  REGISTER: '/register',
  LOGIN: '/login',
  VACATION: '/vacation',
  VACATION_FOLLOW: '/follow',
} as const

export const PASSWORD_PARAMS = {
  MIN_LENGTH: 8,
  MAX_LENGTH: 20,
} as const

export const PASSWORD_ERRORS = {
  PASSWORD_TOO_SHORT: `Password must be ${PASSWORD_PARAMS.MIN_LENGTH} or more characters long`,
  PASSWORD_TOO_LONG: `Password must be ${PASSWORD_PARAMS.MAX_LENGTH} or fewer characters long`,
  PASSWORD_NO_LOWERCASE: 'Password must include a lower-case letter',
  PASSWORD_NO_UPPERCASE: 'Password must include an upper-case letter',
  PASSWORD_NO_DIGIT: 'Password must include a digit',
} as const

export type PASSWORD_ERRORS_UNION = keyof typeof PASSWORD_ERRORS

export const REGISTER_ERRORS = {
  USERNAME_EXISTS: 'Username already exists',
}

export const LOGIN_ERRORS = {
  USER_NOT_FOUND: 'User not found',
  INCORRECT_PASSWORD: 'Incorrect password',
}

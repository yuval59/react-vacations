export const JWT_EXPIRATION = '2h'

export const FORMATS = {
  MYSQL_DATE: ' YYYY-MM-DD ',
}

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const

export const ROUTES = {
  STATUS: '/status',
  REGISTER: '/register',
  LOGIN: '/login',
  VACATIONS: '/vacations',
  VACATION_FOLLOW: '/follow',
  VACATION_STATS: '/stats',
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

export const DATABASE_ERRORS = {
  VACATION_NOT_FOUND: 'Vacation not found',
  VACATION_NOT_FOUND_CODE: 'VACATION_NOT_FOUND',
  DATE_ERROR: 'The dates are incorrect',
  DATE_ERROR_CODE: 'DATE_ERROR',
  USER_NOT_FOUND: 'User not found',
  USER_NOT_FOUND_CODE: 'USER_NOT_FOUND',
  INCORRECT_PASSWORD: 'Incorrect password',
  USERNAME_EXISTS: 'Username already exists',
}

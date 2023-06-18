import 'dotenv/config'

export const FETCH_ROUTES = {
  BASE: process.env.SERVER,
  VACATIONS: '/vacations',
  LOGIN: '/login',
  REGISTER: '/register',
  FOLLOW: '/follow',
  STATS: '/stats',
} as const

export const ROUTES = {
  VACATIONS: '/vacations',
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
} as const

export const DATE_FORMAT = 'DD/MM/YYYY'

export const ERROR_CODES = {
  BAD_REQUEST: 'ERR_BAD_REQUEST',
} as const

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const

export type ROLES_KEYS = keyof typeof ROLES
export type ROLES_VALUES = (typeof ROLES)[ROLES_KEYS]

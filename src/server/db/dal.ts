import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { z } from 'zod'
import config from '../config'
import { DATABASE_ERRORS } from '../constants'
import {
  registerParams,
  vacationCreationParams,
  vacationUpdateParams,
} from '../utils'
import { User, Vacation } from './entities'

dayjs.extend(isSameOrAfter)

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.DB_HOST,
  port: parseInt(config.DB_PORT),
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Vacation],
  migrations: [],
  subscribers: [],
})

export default () =>
  AppDataSource.initialize().then(() => console.log('Database connected'))

export async function addUser(params: z.infer<typeof registerParams>) {
  const { first_name, last_name, username, password } = params

  const user = new User()

  user.first_name = first_name
  user.last_name = last_name
  user.username = username
  user.password = password

  await AppDataSource.manager.save(user)

  console.log(`user has been saved. user id is ${user.id}`)

  return {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    id: user.id,
  }
}

export async function doesUsernameExist(username: string) {
  const first = await User.findOneBy({ username })

  return first != null
}

export function getUserByUsername(username: string) {
  return User.findOneBy({ username })
}

export async function addVacation(
  params: z.infer<typeof vacationCreationParams>
) {
  const { destination, end_date, start_date, description, picture, price } =
    params

  const vacation = new Vacation()

  vacation.destination = destination
  vacation.start_date = start_date
  vacation.end_date = end_date
  if (description) vacation.description = description
  if (picture) vacation.picture = picture
  if (price) vacation.price = price

  await AppDataSource.manager.save(vacation)

  console.log(`Vacation has been saved. Vacation id is ${vacation.id}`)

  return vacation
}

export async function updateVacation(
  params: z.infer<typeof vacationUpdateParams>
) {
  const { destination, end_date, start_date, description, picture, price, id } =
    params

  const vacation = await Vacation.findOneBy({ id })

  if (!vacation) throw DATABASE_ERRORS.VACATION_NOT_FOUND_CODE

  if (destination) vacation.destination = destination
  if (start_date) vacation.start_date = start_date
  if (end_date) vacation.end_date = end_date
  if (description) vacation.description = description
  if (picture) vacation.picture = picture
  if (price) vacation.price = price

  if (!dayjs(vacation.end_date).isSameOrAfter(dayjs(vacation.start_date)))
    throw DATABASE_ERRORS.DATE_ERROR_CODE

  await AppDataSource.manager.save(vacation)

  console.log(`Vacation ${vacation.id} has been edited`)

  return vacation
}

export async function removeVacation(id: string) {
  const vacation = await Vacation.findOneBy({ id })

  if (!vacation) throw DATABASE_ERRORS.VACATION_NOT_FOUND_CODE

  await vacation.remove()
}

export async function addFollower(userId: string, vacationId: string) {
  const vacation = await Vacation.findOneBy({ id: vacationId })
  const follower = await User.findOneBy({ id: userId })

  if (!vacation) throw DATABASE_ERRORS.VACATION_NOT_FOUND_CODE
  if (!follower) throw DATABASE_ERRORS.USER_NOT_FOUND_CODE

  if (!vacation.followers.some((user) => user.id == userId))
    vacation.followers.push(follower)

  await AppDataSource.manager.save(vacation)

  console.log(`User ${follower.id} now follows ${vacation.id} `)
}

export async function removeFollower(userId: string, vacationId: string) {
  const vacation = await Vacation.findOneBy({ id: vacationId })
  const follower = await User.findOneBy({ id: userId })

  if (!vacation) throw DATABASE_ERRORS.VACATION_NOT_FOUND_CODE
  if (!follower) throw DATABASE_ERRORS.USER_NOT_FOUND_CODE

  vacation.followers = vacation.followers.filter(
    (user) => user.id != follower.id
  )

  await AppDataSource.manager.save(vacation)

  console.log(`User ${follower.id} no longer follows ${vacation.id} `)
}

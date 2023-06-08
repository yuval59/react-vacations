import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { z } from 'zod'
import config from '../config'
import { registerParams } from '../utils'
import { User, Vacation } from './entities'

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
  const user = new User()

  const { first_name, last_name, username, password } = params

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

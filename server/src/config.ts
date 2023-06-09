import 'dotenv/config'
import { z } from 'zod'

const envVariables = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_DATABASE: z.string(),

  PORT: z.string(),

  JWT_SECRET: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

const config = envVariables.parse(process.env)

export default config

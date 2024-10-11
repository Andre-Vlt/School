import 'dotenv/config'

import { z } from 'zod'
import { Env } from './env.interface'

let env: Env

console.log(process.env.ENVIRONMENT)
if (process.env.ENVIRONMENT === 'development') {
  const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_USER: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST_DEV: z.string(),
    DATABASE_PORT_DEV: z.coerce.number(),
  })

  const _env = envSchema.safeParse(process.env)

  if (!_env.success) {
    console.error(
      `There's something wrong with the environment variables`,
      _env.error.format(),
    )
    throw new Error(`There's something wrong with the environment variables`)
  }
  env = _env.data
} else if (process.env.ENVIRONMENT === 'production') {
  const envSchema = z.object({
    DATABASE_USER: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    PORT: z.coerce.number().default(3000),
    DATABASE_HOST_PROD: z.string(),
    DATABASE_PORT_PROD: z.coerce.number(),
  })

  const _env = envSchema.safeParse(process.env)

  if (!_env.success) {
    console.error(
      `There's something wrong with the environment variables`,
      _env.error.format(),
    )
    throw new Error(`There's something wrong with the environment variables`)
  }
  env = _env.data
}

export { env }

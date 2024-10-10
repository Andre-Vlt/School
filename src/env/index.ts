import 'dotenv/config'

import { z } from 'zod'

let env
if (process.env.NODE_ENV === 'development') {
  const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_USER: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.coerce.number(),
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
} else if (process.env.NODE_ENV === 'production') {
  const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
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

export default env

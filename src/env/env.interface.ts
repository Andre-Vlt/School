interface DevEnv {
  PORT: number
  DATABASE_USER: string
  DATABASE_NAME: string
  DATABASE_PASSWORD: string
  DATABASE_HOST: string
  DATABASE_PORT: number
}

interface ProdEnv {
  PORT: number
  DATABASE_URL: string
}

export type Env = DevEnv | ProdEnv

interface DevEnv {
  PORT: number
  DATABASE_USER: string
  DATABASE_NAME: string
  DATABASE_PASSWORD: string
  DATABASE_HOST_DEV: string
  DATABASE_PORT_DEV: number
}

interface ProdEnv {
  DATABASE_USER: string
  DATABASE_NAME: string
  DATABASE_PASSWORD: string
  PORT: number
  DATABASE_HOST_PROD: string
  DATABASE_PORT_PROD: number
}

export type Env = DevEnv | ProdEnv

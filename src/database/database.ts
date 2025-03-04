import { env } from 'src/env/index'
import { Pool, PoolClient } from 'pg'
let CONFIG = {}
if (process.env.ENVIRONMENT === 'development') {
  CONFIG = {
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST_DEV,
    database: env.DATABASE_NAME,
    password: env.DATABASE_PASSWORD,
    port: env.DATABASE_PORT_DEV,
  }
} else if (process.env.ENVIRONMENT === 'production') {
  CONFIG = {
    connectionString: `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST_PROD}/${env.DATABASE_NAME}?sslmode=require`,
    ssl: {
      rejectUnauthorized: false,
    },
  }
}

class Database {
  private pool: Pool
  private client: PoolClient | undefined

  constructor() {
    this.pool = new Pool(CONFIG)
    this.connection()
  }

  private async connection() {
    try {
      this.client = await this.pool.connect()
    } catch (error) {
      console.error(`Erro de conexão com o banco de dados: ${error}`)

      throw new Error(`Erro de conexão com o banco de dados: ${error}`)
    }
  }

  get clientInstance() {
    return this.client
  }
}

export const database = new Database()

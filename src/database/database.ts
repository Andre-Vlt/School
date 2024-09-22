import { env } from 'src/env/index'
import { Pool, PoolClient } from 'pg'

const CONFIG = {
  user: env.DATABASE_USER,
  host: env.DATABASE_HOST,
  database: env.DATABASE_NAME,
  password: env.DATABASE_PASSWORD,
  port: env.DATABASE_PORT,
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
      console.error(`Database connection error: ${error}`)

      throw new Error(`Database connection error: ${error}`)
    }
  }

  get clientInstance() {
    return this.client
  }
}

export const database = new Database()

import { IUser } from 'src/entities/user.interface'
import { IUserRepository } from './interfaces/user-repository-interface'
import { database } from 'src/database/database'

export class UserRepository implements IUserRepository {
  async create({ username, password }: IUser): Promise<IUser | undefined> {
    const queryResult = await database.clientInstance?.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [username, password],
    )

    return queryResult?.rows[0]
  }

  async findByUsername(
    username: string,
    password: string,
  ): Promise<IUser | undefined> {
    const queryResult = await database.clientInstance?.query(
      `SELECT * FROM users WHERE username = $1`,
      [username],
    )

    const user = queryResult?.rows[0]

    if (user && user.password === password) {
      return {
        id_user: user.id_user,
        username: user.username,
        password: user.password,
      }
    }
    return undefined
  }
}

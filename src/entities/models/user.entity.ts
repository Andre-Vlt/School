import { IUser } from '../user.interface'

export class User implements IUser {
  id_user?: string | undefined
  username: string
  password: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}

import { IUser } from 'src/entities/user.interface'

export interface IUserRepository {
  create(user: IUser): Promise<IUser | undefined>
}

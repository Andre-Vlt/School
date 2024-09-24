import { User } from 'src/entities/models/user.entity'
import { IUserRepository } from 'src/repositories/interfaces/user-repository-interface'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(user: User) {
    return this.userRepository.create(user)
  }
}

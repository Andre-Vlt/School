import { IUserRepository } from 'src/repositories/interfaces/user-repository-interface'

export class FindUserByUsernameUseCase {
  constructor(private userRepository: IUserRepository) {}

  async handler(username: string, password: string) {
    return this.userRepository.findByUsername(username, password)
  }
}

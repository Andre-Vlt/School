import { UserRepository } from 'src/repositories/user-repository'
import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase() {
  const userRepository = new UserRepository()

  const createUserUseCase = new CreateUserUseCase(userRepository)

  return createUserUseCase
}

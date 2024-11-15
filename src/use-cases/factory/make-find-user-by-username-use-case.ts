import { UserRepository } from 'src/repositories/user-repository'
import { FindUserByUsernameUseCase } from '../find-user-by-username-use-case'

export function makeFindUserByUsernameUseCase() {
  const userRepository = new UserRepository()
  const findUserByUsernameUseCase = new FindUserByUsernameUseCase(
    userRepository,
  )
  return findUserByUsernameUseCase
}

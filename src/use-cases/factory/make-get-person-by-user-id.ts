import { PersonRepository } from 'src/repositories/person-repository'
import { GetPersonByUserIdUseCase } from '../get-person-by-user-id-use-case'

export function makeGetPersonByUserIdUseCase() {
  const personRepository = new PersonRepository()
  const getPersonByUserIdUseCase = new GetPersonByUserIdUseCase(
    personRepository,
  )
  return getPersonByUserIdUseCase
}

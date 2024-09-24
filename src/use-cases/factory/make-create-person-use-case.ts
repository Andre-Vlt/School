import { PersonRepository } from 'src/repositories/person-repository'
import { CreatePersonUseCase } from '../create-person-use-case'

export function makeCreatePersonUseCase() {
  const personRepository = new PersonRepository()

  const createPersonUseCase = new CreatePersonUseCase(personRepository)

  return createPersonUseCase
}

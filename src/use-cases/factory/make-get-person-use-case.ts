import { PersonRepository } from 'src/repositories/person-repository'
import { GetPersonUseCase } from '../get-person-use-case'

export function makeGetPersonUseCase() {
  const personRepository = new PersonRepository()

  const getPersonUseCase = new GetPersonUseCase(personRepository)

  return getPersonUseCase
}

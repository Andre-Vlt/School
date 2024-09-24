import { IPerson } from 'src/entities/person.interface'
import { IPersonRepository } from 'src/repositories/interfaces/person-repository-interface'

export class CreatePersonUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(person: IPerson) {
    return this.personRepository.create(person)
  }
}

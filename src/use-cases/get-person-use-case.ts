import { IPersonRepository } from 'src/repositories/interfaces/person-repository-interface'

export class GetPersonUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(id: string) {
    return this.personRepository.getPersonById(id)
  }
}

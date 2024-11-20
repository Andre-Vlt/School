import { IPersonRepository } from 'src/repositories/interfaces/person-repository-interface'

export class GetPersonByUserIdUseCase {
  constructor(private personRepository: IPersonRepository) {}

  async handler(id: string) {
    return this.personRepository.getPersonByUserId(id)
  }
}

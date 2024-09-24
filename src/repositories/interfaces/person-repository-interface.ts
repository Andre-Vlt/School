import { IPerson } from 'src/entities/person.interface'

export interface IPersonRepository {
  create(person: IPerson): Promise<IPerson | undefined>
}

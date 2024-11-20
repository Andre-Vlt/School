import { IPerson } from 'src/entities/person.interface'

export interface IPersonRepository {
  create(person: IPerson): Promise<IPerson | undefined>
  getPersonById(id: string): Promise<IPerson | undefined>
  getPersonByUserId(id: string): Promise<IPerson | undefined>
}

import { IPerson } from 'src/entities/person.interface'
import { IPersonRepository } from './interfaces/person-repository-interface'
import { database } from 'src/database/database'

export class PersonRepository implements IPersonRepository {
  async create({
    id_user,
    name,
    email,
    birth,
    cpf,
  }: IPerson): Promise<IPerson | undefined> {
    const query = `INSERT INTO person (id_user, name, email, birth, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const result = await database.clientInstance?.query(query, [
      id_user,
      name,
      email,
      birth,
      cpf,
    ])

    return result?.rows[0]
  }

  async getPersonById(id: string): Promise<IPerson | undefined> {
    const query = `SELECT * FROM person WHERE id_person = $1`
    const result = await database.clientInstance?.query(query, [id])

    return result?.rows[0]
  }
}

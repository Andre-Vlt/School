import { database } from '../database/database'
import { IPerson } from '../entities-models/person.interface'

export const createPerson = async (student: IPerson) => {
  const query = `INSERT INTO person (id_user, name, email, birth, cpf) VALUES ($1, $2, $3, $4, $5) RETURNING *`
  const result = await database.clientInstance?.query(query, [
    student.id_user,
    student.name,
    student.email,
    student.birth,
    student.cpf,
  ])

  return result?.rows
}

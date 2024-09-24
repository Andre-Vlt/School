import { IStudent } from 'src/entities/student.interface'
import { IStudentRepository } from './interfaces/student-repository-interface'
import { database } from 'src/database/database'

export class StudentRepository implements IStudentRepository {
  async create({ id_person, grade }: IStudent): Promise<IStudent | undefined> {
    const query = `INSERT INTO students (id_person, grade) VALUES ($1, $2) RETURNING *`
    const queryResult = await database.clientInstance?.query(query, [
      id_person,
      grade,
    ])

    return queryResult?.rows[0]
  }
}

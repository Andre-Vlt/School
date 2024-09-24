import { ITeacher } from 'src/entities/teacher.interface'
import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'
import { database } from 'src/database/database'

export class TeacherRepository implements ITeacherRepository {
  async create({
    id_person,
    id_subject,
  }: ITeacher): Promise<ITeacher | undefined> {
    const queryResult = await database.clientInstance?.query(
      `INSERT INTO teachers (id_person, id_subject) VALUES ($1, $2) RETURNING *`,
      [id_person, id_subject],
    )

    return queryResult?.rows[0]
  }
}

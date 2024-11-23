import { ITeacher } from 'src/entities/teacher.interface'
import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'
import { database } from 'src/database/database'

export class TeacherRepository implements ITeacherRepository {
  async create({
    id_person,
    id_subject,
    teacher_name,
  }: ITeacher): Promise<ITeacher | undefined> {
    const queryResult = await database.clientInstance?.query(
      `INSERT INTO teachers (id_person, id_subject, teacher_name) VALUES ($1, $2, $3) RETURNING *`,
      [id_person, id_subject, teacher_name],
    )

    return queryResult?.rows[0]
  }

  async getTeacherById(id: string): Promise<ITeacher | undefined> {
    const queryResult = await database.clientInstance?.query(
      `SELECT * FROM teachers WHERE id_teacher = $1`,
      [id],
    )

    return queryResult?.rows[0]
  }

  async getTeacherByPersonId(id: string): Promise<ITeacher | undefined> {
    const queryResult = await database.clientInstance?.query(
      `SELECT * FROM teachers WHERE id_person = $1`,
      [id],
    )

    return queryResult?.rows[0]
  }
}

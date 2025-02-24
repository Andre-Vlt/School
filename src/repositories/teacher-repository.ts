import { ITeacher } from 'src/entities/teacher.interface'
import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'
import { database } from 'src/database/database'


export interface UpdateTeacher{
  teacher_name: string;
  id_subject: number;
  id_teacher: string;
}

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

  async getAllTeachers(): Promise<ITeacher[] | undefined> {
    const queryResult = await database.clientInstance?.query(
      `SELECT * FROM teachers`,
    )

    return queryResult?.rows
  }

  async updateTeacher({ id_teacher, id_subject, teacher_name }: UpdateTeacher): Promise<UpdateTeacher | undefined>{
    const queryResult = await database.clientInstance?.query(
      `UPDATE teachers SET teacher_name = $1, id_subject = $2 WHERE id_teacher = $3 RETURNING *`,
      [teacher_name, id_subject, id_teacher]
    )

    return queryResult?.rows[0]
  }
}

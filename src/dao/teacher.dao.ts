import { database } from 'src/database/database'
import { ITeacher } from 'src/entities-models/teacher.interface'

export const createTeacher = async (teacher: ITeacher) => {
  const query = `INSERT INTO teachers (id_person, id_subject) VALUES ($1, $2) RETURNING *`
  const result = await database.clientInstance?.query(query, [
    teacher.id_person,
    teacher.id_subject,
  ])

  return result?.rows
}

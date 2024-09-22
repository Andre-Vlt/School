import { database } from 'src/database/database'
import { IStudent } from 'src/entities-models/student.interface'

export const createStudent = async (student: IStudent) => {
  const query = `INSERT INTO students (id_person, grade) VALUES ($1, $2) RETURNING *`
  const result = await database.clientInstance?.query(query, [
    student.id_person,
    student.grade,
  ])

  return result?.rows
}

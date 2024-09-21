import { database } from 'database/database'

export class Teacher {
  async createTeacher(id_person: string, id_subject: number) {
    const query = `INSERT INTO teachers (id_person, id_subject) VALUES ($1, $2) RETURNING *`
    const result = await database.clientInstance?.query(query, [
      id_person,
      id_subject,
    ])

    return result?.rows
  }
}

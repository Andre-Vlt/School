import { IStudent } from 'src/entities/student.interface'
import { IStudentRepository } from './interfaces/student-repository-interface'
import { database } from 'src/database/database'

export interface UpdateStudent{
  id_person: string;
  grade: string;
  student_name: string;
}

export class StudentRepository implements IStudentRepository {
  async create({ id_person, grade }: IStudent): Promise<IStudent | undefined> {
    const query = `INSERT INTO students (id_person, grade) VALUES ($1, $2) RETURNING *`
    const queryResult = await database.clientInstance?.query(query, [
      id_person,
      grade,
    ])

    return queryResult?.rows[0]
  }

  async getAllStudents(): Promise<IStudent[] | undefined> {
    const query = `SELECT * FROM students_view`
    const queryResult = await database.clientInstance?.query(query)

    return queryResult?.rows
  }

  async updateStudent({ id_person, grade, student_name }: UpdateStudent): Promise<UpdateStudent | undefined> {
    const client = database.clientInstance;

    if(!client) return undefined;

    try{
      await client.query('BEGIN');
      const updateStudentQuery = `UPDATE students SET grade = $2 WHERE id_person = $1 RETURNING *`
      const studentResult = await client.query(updateStudentQuery, [id_person, grade])

      const updatePersonQuery = `UPDATE person SET name = $2 WHERE id_person = $1`

      await client.query(updatePersonQuery, [id_person, student_name]);

      await client.query('COMMIT');
      return studentResult.rows[0];
    }catch(error){
      await client.query('ROLLBACK');
      throw error;
    }
  }

  async getStudentByPersonId(id_person: string): Promise<IStudent | undefined> {
    const query = `SELECT * FROM students_view WHERE id_person = $1`
    const queryResult = await database.clientInstance?.query(query, [id_person])

    return queryResult?.rows[0]
  }
}

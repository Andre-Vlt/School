import { IStudent } from 'src/entities/student.interface'
import { UpdateStudent } from '../student-repository'

export interface IStudentRepository {
  create(student: IStudent): Promise<IStudent | undefined>
  getAllStudents(): Promise<IStudent[] | undefined>
  updateStudent({ id_person, grade, student_name }: UpdateStudent): Promise<UpdateStudent | undefined>
  getStudentByPersonId(id_person: string): Promise<IStudent | undefined>
}

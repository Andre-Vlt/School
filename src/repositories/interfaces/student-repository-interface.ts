import { IStudent } from 'src/entities/student.interface'

export interface IStudentRepository {
  create(student: IStudent): Promise<IStudent | undefined>
  getAllStudents(): Promise<IStudent[] | undefined>
}

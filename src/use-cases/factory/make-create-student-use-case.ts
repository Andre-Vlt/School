import { StudentRepository } from 'src/repositories/student-repository'
import { CreateStudentUseCase } from '../create-student-use-case'

export function makeCreateStudentUseCase() {
  const studentRepository = new StudentRepository()
  const createStudentUseCase = new CreateStudentUseCase(studentRepository)

  return createStudentUseCase
}

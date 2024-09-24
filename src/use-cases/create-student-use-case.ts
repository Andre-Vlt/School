import { Student } from 'src/entities/models/student.entity'
import { IStudentRepository } from 'src/repositories/interfaces/student-repository-interface'

export class CreateStudentUseCase {
  constructor(private studentRepository: IStudentRepository) {}

  async handler(student: Student) {
    return this.studentRepository.create(student)
  }
}

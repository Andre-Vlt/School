import { ITeacher } from 'src/entities/teacher.interface'
import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'

export class CreateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(teacher: ITeacher) {
    return this.teacherRepository.create(teacher)
  }
}

import { Teacher } from 'src/entities/models/teacher.entity'
import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'

export class CreateTeacherUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(teacher: Teacher) {
    return this.teacherRepository.create(teacher)
  }
}

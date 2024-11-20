import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'

export class GetTeacherByIdUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(id: string) {
    return this.teacherRepository.getTeacherById(id)
  }
}

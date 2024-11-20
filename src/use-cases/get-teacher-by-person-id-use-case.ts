import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface'

export class GetTeacherByPersonIdUseCase {
  constructor(private teacherRepository: ITeacherRepository) {}

  async handler(id: string) {
    return this.teacherRepository.getTeacherByPersonId(id)
  }
}

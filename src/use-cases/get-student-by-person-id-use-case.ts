import { IStudentRepository } from "src/repositories/interfaces/student-repository-interface";


export class GetStudentByPersonIdUseCase {
  constructor(private teacherRepository: IStudentRepository) {}

  async handler(id: string) {
    return this.teacherRepository.getStudentByPersonId(id)
  }
}

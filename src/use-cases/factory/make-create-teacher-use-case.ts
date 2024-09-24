import { CreateTeacherUseCase } from 'src/use-cases/create-teacher-use-case'
import { TeacherRepository } from 'src/repositories/teacher-repository'

export function makeCreateTeacherUseCase() {
  const teacherRepository = new TeacherRepository()

  const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository)

  return createTeacherUseCase
}

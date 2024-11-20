import { TeacherRepository } from 'src/repositories/teacher-repository'
import { GetTeacherByIdUseCase } from '../get-teacher-by-id-use-case'

export function makeGetTeacherByIdUseCase() {
  const teacherRepository = new TeacherRepository()
  const getTeacherByIdUseCase = new GetTeacherByIdUseCase(teacherRepository)
  return getTeacherByIdUseCase
}

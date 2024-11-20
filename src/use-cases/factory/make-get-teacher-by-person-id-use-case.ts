import { TeacherRepository } from 'src/repositories/teacher-repository'
import { GetTeacherByPersonIdUseCase } from '../get-teacher-by-person-id-use-case'

export function makeGetTeacherByPersonIdUseCase() {
  const teacherRepository = new TeacherRepository()
  const getTeacherByPersonIdUseCase = new GetTeacherByPersonIdUseCase(
    teacherRepository,
  )
  return getTeacherByPersonIdUseCase
}

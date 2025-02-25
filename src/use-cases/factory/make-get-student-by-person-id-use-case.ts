import { StudentRepository } from "src/repositories/student-repository"
import { GetStudentByPersonIdUseCase } from "../get-student-by-person-id-use-case"

export function makeGetStudentByPersonIdUseCase() {
  const studentRepository = new StudentRepository()
  const getStudentByPersonIdUseCase = new GetStudentByPersonIdUseCase(
    studentRepository,
  )
  return getStudentByPersonIdUseCase
}

import { IStudent } from '../student.interface'

export class Student implements IStudent {
  id_student?: string
  id_person: string
  grade: string

  constructor(id_person: string, grade: string) {
    this.id_person = id_person
    this.grade = grade
  }
}

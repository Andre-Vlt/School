import { ITeacher } from 'src/entities/teacher.interface'

export class Teacher implements ITeacher {
  id_teacher?: string | undefined
  id_person: string
  id_subject: number
  teacher_name: string

  constructor(id_person: string, id_subject: number, teacher_name: string) {
    this.id_person = id_person
    this.id_subject = id_subject
    this.teacher_name = teacher_name
  }
}

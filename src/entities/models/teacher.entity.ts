import { ITeacher } from 'src/entities/teacher.interface'

export class Teacher implements ITeacher {
  id_teacher?: string | undefined
  id_person: string
  id_subject: number

  constructor(id_person: string, id_subject: number) {
    this.id_person = id_person
    this.id_subject = id_subject
  }
}

import { ITeacher } from 'src/entities/teacher.interface'

export interface ITeacherRepository {
  create(teacher: ITeacher): Promise<ITeacher | undefined>
  getTeacherById(id: string): Promise<ITeacher | undefined>
  getTeacherByPersonId(id: string): Promise<ITeacher | undefined>
}

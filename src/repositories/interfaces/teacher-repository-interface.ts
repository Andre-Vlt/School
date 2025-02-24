import { ITeacher } from 'src/entities/teacher.interface'
import { UpdateTeacher } from '../teacher-repository'

export interface ITeacherRepository {
  create(teacher: ITeacher): Promise<ITeacher | undefined>
  getTeacherById(id: string): Promise<ITeacher | undefined>
  getTeacherByPersonId(id: string): Promise<ITeacher | undefined>
  getAllTeachers(): Promise<ITeacher[] | undefined>
  updateTeacher({ id_teacher, id_subject, teacher_name }:UpdateTeacher): Promise<UpdateTeacher | undefined>
}

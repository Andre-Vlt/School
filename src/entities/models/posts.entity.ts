import { IPost } from '../posts.interface'

export class Post implements IPost {
  id_post?: number
  id_teacher: string
  teacher_name: string
  id_subject: number
  post_text: string
  post_title: string
  post_date: Date

  constructor(
    id_teacher: string,
    teacher_name: string,
    id_subject: number,
    post_text: string,
    post_title: string,
    post_date: Date,
  ) {
    this.id_teacher = id_teacher
    this.id_subject = id_subject
    this.teacher_name = teacher_name
    this.post_text = post_text
    this.post_title = post_title
    this.post_date = post_date
  }
}

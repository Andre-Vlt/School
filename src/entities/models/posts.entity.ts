import { IPost } from '../posts.interface'

export class Post implements IPost {
  id_post?: number
  id_teacher: string
  id_subject: number
  post_text: string
  post_title: string
  post_date: Date
  subject_name: string

  constructor(
    id_teacher: string,
    id_subject: number,
    post_text: string,
    post_title: string,
    post_date: Date,
    subject_name: string,
  ) {
    this.id_teacher = id_teacher
    this.id_subject = id_subject
    this.post_text = post_text
    this.post_title = post_title
    this.post_date = post_date
    this.subject_name = subject_name
  }
}

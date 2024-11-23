import { IPost } from 'src/entities/posts.interface'
import { IPostRepository } from './interfaces/posts-repository-interface'
import { database } from 'src/database/database'

export class PostsRepository implements IPostRepository {
  async findAllPosts(
    page: number,
    limit: number,
  ): Promise<IPost[] | undefined> {
    const offset = (page - 1) * limit

    const queryResult = await database.clientInstance?.query(
      `
      SELECT 
        posts.id_post,
        posts.post_title,
        posts.post_text,
        posts.post_date,
        posts.teacher_name,
        subjects.subject_name
      FROM 
        posts
      JOIN 
        subjects 
      ON 
        posts.id_subject = subjects.id_subject
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    )

    return queryResult?.rows
  }

  async findPostById(id_post: number): Promise<IPost | undefined> {
    const queryResult = await database.clientInstance?.query(
      `SELECT * FROM posts WHERE id_post = $1`,
      [id_post],
    )

    return queryResult?.rows[0]
  }

  async createPost({
    id_teacher,
    id_subject,
    post_text,
    post_title,
    post_date,
  }: IPost): Promise<IPost | undefined> {
    const query = `INSERT INTO posts (id_teacher, id_subject, post_text, post_title, post_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const queryResult = await database.clientInstance?.query(query, [
      id_teacher,
      id_subject,
      post_text,
      post_title,
      post_date,
    ])

    return queryResult?.rows[0]
  }

  async updatePost({
    id_post,
    id_teacher,
    id_subject,
    post_text,
    post_title,
    post_date,
  }: IPost): Promise<IPost | undefined> {
    const query = `UPDATE posts SET id_teacher = $1, id_subject = $2, post_text = $3, post_title = $4, post_date = $5 WHERE id_post = $6 RETURNING *`
    const queryResult = await database.clientInstance?.query(query, [
      id_teacher,
      id_subject,
      post_text,
      post_title,
      post_date,
      id_post,
    ])
    return queryResult?.rows[0]
  }

  async deletePost(id_post: number): Promise<{ Success: string }> {
    await database.clientInstance?.query(
      `DELETE FROM posts WHERE id_post = $1`,
      [id_post],
    )

    return { Success: 'Post deleted' }
  }

  async keyWordSearch(keyWord: string): Promise<IPost[] | undefined> {
    const queryResult = await database.clientInstance?.query(
      `SELECT * FROM posts WHERE post_text ILIKE $1 OR post_title ILIKE $1`,
      [`%${keyWord}%`],
    )

    return queryResult?.rows
  }
}

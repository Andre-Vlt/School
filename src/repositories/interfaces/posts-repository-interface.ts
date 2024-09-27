import { IPost } from 'src/entities/posts.interface'

export interface IPostRepository {
  findAllPosts(page: number, limit: number): Promise<IPost[] | undefined>
  findPostById(id_post: number): Promise<IPost | undefined>
  createPost(post: IPost): Promise<IPost | undefined>
  updatePost(post: IPost): Promise<IPost | undefined>
  deletePost(id_post: number): Promise<{ Success: string }>
  keyWordSearch(keyWord: string): Promise<IPost[] | undefined>
}

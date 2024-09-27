import { PostsRepository } from 'src/repositories/posts-repository'
import { DeletePostUseCase } from '../delete-post-use-case'

export function makeDeletePostUseCase() {
  const postRepository = new PostsRepository()
  const deletePostUseCase = new DeletePostUseCase(postRepository)
  return deletePostUseCase
}

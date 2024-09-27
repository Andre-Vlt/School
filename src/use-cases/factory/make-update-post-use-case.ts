import { PostsRepository } from 'src/repositories/posts-repository'
import { UpdatePostUseCase } from '../update-post-use-case'

export function makeUpdatePostUseCase() {
  const postRepository = new PostsRepository()
  const updatePostUseCase = new UpdatePostUseCase(postRepository)
  return updatePostUseCase
}

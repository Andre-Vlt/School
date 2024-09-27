import { PostsRepository } from 'src/repositories/posts-repository'
import { FindPostByIdUseCase } from '../find-post-by-id-use-case'

export function makeFindPostByIdUseCase() {
  const postRepository = new PostsRepository()
  const findPostByIdUseCase = new FindPostByIdUseCase(postRepository)
  return findPostByIdUseCase
}

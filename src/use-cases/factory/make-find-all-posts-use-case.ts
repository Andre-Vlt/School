import { PostsRepository } from 'src/repositories/posts-repository'
import { FindAllPostsUseCase } from '../find-all-posts-use-case'

export function makeFindAllPostsUseCase() {
  const postRepository = new PostsRepository()
  const findAllPostsUseCase = new FindAllPostsUseCase(postRepository)
  return findAllPostsUseCase
}

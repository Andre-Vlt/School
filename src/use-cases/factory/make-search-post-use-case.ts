import { PostsRepository } from 'src/repositories/posts-repository'
import { SearchPostUseCase } from '../search-post-use-case'

export async function makeSearchPostUseCase() {
  const postsRepository = new PostsRepository()

  const makeSearchPostUseCase = new SearchPostUseCase(postsRepository)

  return makeSearchPostUseCase
}
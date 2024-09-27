import { PostsRepository } from 'src/repositories/posts-repository'
import { CreatePostUseCase } from '../create-post-use-case'

export function makeCreatePostUseCase() {
  const postRepository = new PostsRepository()
  const createPostUseCase = new CreatePostUseCase(postRepository)
  return createPostUseCase
}

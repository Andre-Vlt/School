import { IPost } from 'src/entities/posts.interface'
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface'

export class CreatePostUseCase {
  constructor(private postRepository: IPostRepository) {}
  async handler(post: IPost) {
    return this.postRepository.createPost(post)
  }
}

import { IPost } from 'src/entities/posts.interface'
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface'

export class UpdatePostUseCase {
  constructor(private postRepository: IPostRepository) {}
  async handler(post: IPost): Promise<IPost | undefined> {
    return this.postRepository.updatePost(post)
  }
}

import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface'

export class DeletePostUseCase {
  constructor(private postRepository: IPostRepository) {}
  async handler(id_post: number) {
    return await this.postRepository.deletePost(id_post)
  }
}

import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface'

export class FindPostByIdUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(id_post: number) {
    return this.postRepository.findPostById(id_post)
  }
}

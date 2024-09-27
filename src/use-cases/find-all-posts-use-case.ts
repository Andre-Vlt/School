import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface'

export class FindAllPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async handler(page: number, limit: number) {
    return this.postRepository.findAllPosts(page, limit)
  }
}

import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface'

export class SearchPostUseCase {
  constructor(private postsRepository: IPostRepository) {}

  async handler(keyWord: string) {
    return await this.postsRepository.keyWordSearch(keyWord)
  }
}

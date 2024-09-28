import { describe, it, expect, vi } from 'vitest';
import { SearchPostUseCase } from 'src/use-cases/search-post-use-case';
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface';
import { IPost } from 'src/entities/posts.interface';

describe('SearchPostUseCase', () => {
  it('should call postsRepository.keyWordSearch with the correct keyWord', async () => {
    // Mock do repositório
    const postRepository: IPostRepository = {
      keyWordSearch: vi.fn().mockResolvedValueOnce([
        {
          id_post: 1,
          id_teacher: 'teacher-123',
          id_subject: 101,
          post_text: 'This is a post about testing',
          post_title: 'Post Title',
          post_date: new Date('2024-01-01'),
        },
        {
          id_post: 2,
          id_teacher: 'teacher-456',
          id_subject: 102,
          post_text: 'Another post related to testing',
          post_title: 'Another Post Title',
          post_date: new Date('2024-02-01'),
        },
      ]),
      createPost: vi.fn(),
      findAllPosts: vi.fn(),
      findPostById: vi.fn(),
      updatePost: vi.fn(),
      deletePost: vi.fn(),
    };

    // Instancia o caso de uso com o mock
    const searchPostUseCase = new SearchPostUseCase(postRepository);

    // Mock da palavra-chave
    const keyWord = 'testing';

    const result = await searchPostUseCase.handler(keyWord);

    // Verifica se o método keyWordSearch foi chamado com a palavra-chave correta
    expect(postRepository.keyWordSearch).toHaveBeenCalledWith(keyWord);

    // Verifica o resultado retornado
    expect(result).toEqual([
      {
        id_post: 1,
        id_teacher: 'teacher-123',
        id_subject: 101,
        post_text: 'This is a post about testing',
        post_title: 'Post Title',
        post_date: new Date('2024-01-01'),
      },
      {
        id_post: 2,
        id_teacher: 'teacher-456',
        id_subject: 102,
        post_text: 'Another post related to testing',
        post_title: 'Another Post Title',
        post_date: new Date('2024-02-01'),
      },
    ]);
  });
});

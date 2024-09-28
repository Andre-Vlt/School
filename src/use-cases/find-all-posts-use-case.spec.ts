import { describe, it, expect, vi } from 'vitest';
import { FindAllPostsUseCase } from 'src/use-cases/find-all-posts-use-case';
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface';

describe('FindAllPostsUseCase', () => {
  it('should call postRepository.findAllPosts with the correct page and limit', async () => {
    // Mock do repositório
    const postRepository: IPostRepository = {
      findAllPosts: vi.fn().mockResolvedValueOnce([
        {
          id_post: 1,
          id_teacher: 'teacher-123',
          id_subject: 101,
          post_text: 'This is a post text',
          post_title: 'Post Title',
          post_date: new Date('2024-01-01'),
        },
        {
          id_post: 2,
          id_teacher: 'teacher-456',
          id_subject: 102,
          post_text: 'Another post text',
          post_title: 'Another Post Title',
          post_date: new Date('2024-02-01'),
        },
      ]),
      createPost: vi.fn(),
      findPostById: vi.fn(),
      updatePost: vi.fn(),
      deletePost: vi.fn(),
      keyWordSearch: vi.fn(),
    };

    // Instancia o caso de uso com o mock
    const findAllPostsUseCase = new FindAllPostsUseCase(postRepository);

    // Mock das variáveis de paginação
    const page = 1;
    const limit = 10;

    const result = await findAllPostsUseCase.handler(page, limit);

    // Verifica se o método findAllPosts foi chamado com a página e limite corretos
    expect(postRepository.findAllPosts).toHaveBeenCalledWith(page, limit);

    // Verifica o resultado retornado
    expect(result).toEqual([
      {
        id_post: 1,
        id_teacher: 'teacher-123',
        id_subject: 101,
        post_text: 'This is a post text',
        post_title: 'Post Title',
        post_date: new Date('2024-01-01'),
      },
      {
        id_post: 2,
        id_teacher: 'teacher-456',
        id_subject: 102,
        post_text: 'Another post text',
        post_title: 'Another Post Title',
        post_date: new Date('2024-02-01'),
      },
    ]);
  });
});

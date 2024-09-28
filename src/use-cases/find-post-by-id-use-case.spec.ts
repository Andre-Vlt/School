import { describe, it, expect, vi } from 'vitest';
import { FindPostByIdUseCase } from 'src/use-cases/find-post-by-id-use-case';
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface';

describe('FindPostByIdUseCase', () => {
  it('should call postRepository.findPostById with the correct id_post', async () => {
    // Mock do repositório
    const postRepository: IPostRepository = {
      findPostById: vi.fn().mockResolvedValueOnce({
        id_post: 1,
        id_teacher: 'teacher-123',
        id_subject: 101,
        post_text: 'This is a post text',
        post_title: 'Post Title',
        post_date: new Date('2024-01-01'),
      }),
      createPost: vi.fn(),
      findAllPosts: vi.fn(),
      updatePost: vi.fn(),
      deletePost: vi.fn(),
      keyWordSearch: vi.fn(),
    };

    // Instancia o caso de uso com o mock
    const findPostByIdUseCase = new FindPostByIdUseCase(postRepository);

    // Mock do id_post
    const id_post = 1;

    const result = await findPostByIdUseCase.handler(id_post);

    // Verifica se o método findPostById foi chamado com o id_post correto
    expect(postRepository.findPostById).toHaveBeenCalledWith(id_post);

    // Verifica o resultado retornado
    expect(result).toEqual({
      id_post: 1,
      id_teacher: 'teacher-123',
      id_subject: 101,
      post_text: 'This is a post text',
      post_title: 'Post Title',
      post_date: new Date('2024-01-01'),
    });
  });
});

import { describe, it, expect, vi } from 'vitest';
import { UpdatePostUseCase } from 'src/use-cases/update-post-use-case';
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface';
import { IPost } from 'src/entities/posts.interface';

describe('UpdatePostUseCase', () => {
  it('should call postRepository.updatePost with the correct post', async () => {
    // Mock do repositório
    const postRepository: IPostRepository = {
      updatePost: vi.fn().mockResolvedValueOnce({
        id_post: 1,
        id_teacher: 'teacher-123',
        id_subject: 101,
        post_text: 'This is an updated post text',
        post_title: 'Updated Post Title',
        post_date: new Date('2024-01-01'),
      }),
      createPost: vi.fn(),
      findAllPosts: vi.fn(),
      findPostById: vi.fn(),
      deletePost: vi.fn(),
      keyWordSearch: vi.fn(),
    };

    // Instancia o caso de uso com o mock
    const updatePostUseCase = new UpdatePostUseCase(postRepository);

    // Mock do post a ser atualizado
    const post: IPost = {
      id_post: 1,
      id_teacher: 'teacher-123',
      id_subject: 101,
      post_text: 'This is an updated post text',
      post_title: 'Updated Post Title',
      post_date: new Date('2024-01-01'),
    };

    const result = await updatePostUseCase.handler(post);

    // Verifica se o método updatePost foi chamado com o post correto
    expect(postRepository.updatePost).toHaveBeenCalledWith(post);

    // Verifica o resultado retornado
    expect(result).toEqual({
      id_post: 1,
      id_teacher: 'teacher-123',
      id_subject: 101,
      post_text: 'This is an updated post text',
      post_title: 'Updated Post Title',
      post_date: new Date('2024-01-01'),
    });
  });
});

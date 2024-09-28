import { describe, it, expect, vi } from 'vitest';
import { DeletePostUseCase } from 'src/use-cases/delete-post-use-case';
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface';

describe('DeletePostUseCase', () => {
  it('should call postRepository.deletePost with the correct id_post', async () => {
    // Mock do repositório
    const postRepository: IPostRepository = {
      deletePost: vi.fn().mockResolvedValueOnce({ Success: 'Post deleted successfully' }),
      createPost: vi.fn(),
      findAllPosts: vi.fn(),
      findPostById: vi.fn(),
      updatePost: vi.fn(),
      keyWordSearch: vi.fn(),
    };

    // Instancia o caso de uso com o mock
    const deletePostUseCase = new DeletePostUseCase(postRepository);

    // Mock do id_post
    const id_post = 1;

    const result = await deletePostUseCase.handler(id_post);

    // Verifica se o método deletePost foi chamado com o id_post correto
    expect(postRepository.deletePost).toHaveBeenCalledWith(id_post);

    // Verifica o resultado retornado
    expect(result).toEqual({ Success: 'Post deleted successfully' });
  });
});

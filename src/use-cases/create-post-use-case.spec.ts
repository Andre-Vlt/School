import { describe, it, expect, vi } from 'vitest';
import { CreatePostUseCase } from 'src/use-cases/create-post-use-case';
import { IPost } from 'src/entities/posts.interface';
import { IPostRepository } from 'src/repositories/interfaces/posts-repository-interface';

describe('CreatePostUseCase', () => {
  it('should call postRepository.createPost with the correct post', async () => {
    // Mock do repositório com todos os métodos da interface
    const postRepository: IPostRepository = {
      createPost: vi.fn().mockResolvedValueOnce({
        id_post: 1,
        id_teacher: 'teacher-shcool-fiap',
        id_subject: 101,
        post_text: 'This is a post test',
        post_title: 'Post Title Test',
        post_date: new Date('2024-01-01'),
      }),
      findAllPosts: vi.fn(),
      findPostById: vi.fn(),
      updatePost: vi.fn(),
      deletePost: vi.fn(),
      keyWordSearch: vi.fn(),
    };

    
    const createPostUseCase = new CreatePostUseCase(postRepository);

    
    const post: IPost = {
      id_teacher: 'teacher-shcool-fiap',
      id_subject: 101,
      post_text: 'This is a post test',
      post_title: 'Post Title Test',
      post_date: new Date('2024-01-01')
    };

   
    const result = await createPostUseCase.handler(post);

    
    expect(postRepository.createPost).toHaveBeenCalledWith(post);

    
    expect(result).toEqual({
      id_post: 1,
      id_teacher: 'teacher-shcool-fiap',
      id_subject: 101,
      post_text: 'This is a post test',
      post_title: 'Post Title Test',
      post_date: new Date('2024-01-01'),
    });
  });
});

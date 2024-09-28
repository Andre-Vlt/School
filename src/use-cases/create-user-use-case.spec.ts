import { describe, it, expect, vi } from 'vitest';
import { CreateUserUseCase } from 'src/use-cases/create-user-use-case';
import { IUserRepository } from 'src/repositories/interfaces/user-repository-interface';
import { IUser } from 'src/entities/user.interface';

describe('CreateUserUseCase', () => {
  it('should call userRepository.create with the correct user', async () => {
    // Mock do repositório
    const userRepository: IUserRepository = {
      create: vi.fn().mockResolvedValueOnce({
        id_user: '1',
        username: 'john_doe',
        password: 'hashed_password',
      }),
    };

    // Instancia o caso de uso com o mock
    const createUserUseCase = new CreateUserUseCase(userRepository);

    // Mock do usuário
    const user: IUser = {
      username: 'john_doe',
      password: 'hashed_password',
    };

    
    const result = await createUserUseCase.handler(user);
    
    expect(userRepository.create).toHaveBeenCalledWith(user);

    // Verifica o resultado retornado
    expect(result).toEqual({
      id_user: '1',
      username: 'john_doe',
      password: 'hashed_password',
    });
  });
});

import { describe, it, expect, vi } from 'vitest'
import { CreatePersonUseCase } from 'src/use-cases/create-person-use-case'
import { IPerson } from 'src/entities/person.interface'
import { IPersonRepository } from 'src/repositories/interfaces/person-repository-interface'

describe('CreatePersonUseCase', () => {
  it('should call personRepository.create with the correct person', async () => {
    // Mock do repositório
    const personRepository: IPersonRepository = {
      create: vi.fn().mockResolvedValueOnce({
        id_person: '1',
        id_user: 'user-123',
        name: 'John Doe',
        email: 'johndoe@example.com',
        birth: new Date('1990-01-01'),
        cpf: '123.456.789-10',
      }),
    }

    // Instancia o caso de uso com o mock
    const createPersonUseCase = new CreatePersonUseCase(personRepository)

    // Mock da pessoa
    const person: IPerson = {
      id_user: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      birth: new Date('1990-01-01'),
      cpf: '123.456.789-10',
    }

    const result = await createPersonUseCase.handler(person)

    expect(personRepository.create).toHaveBeenCalledWith(person)

    expect(result).toEqual({
      id_person: '1',
      id_user: 'user-123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      birth: new Date('1990-01-01'),
      cpf: '123.456.789-10',
    })
  })
})

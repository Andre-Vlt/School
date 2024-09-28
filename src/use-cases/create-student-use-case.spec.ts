import { describe, it, expect, vi } from 'vitest';
import { CreateStudentUseCase } from 'src/use-cases/create-student-use-case';
import { IStudentRepository } from 'src/repositories/interfaces/student-repository-interface';
import { IStudent } from 'src/entities/student.interface';

describe('CreateStudentUseCase', () => {
  it('should call studentRepository.create with the correct student', async () => {
    // Mock do repositório
    const studentRepository: IStudentRepository = {
      create: vi.fn().mockResolvedValueOnce({
        id_student: '1',
        id_person: 'person-school-fiap',
        grade: 'A',
      }),
    };

    
    const createStudentUseCase = new CreateStudentUseCase(studentRepository);

    
    const student: IStudent = {
      id_person: 'person-school-fiap',
      grade: 'A',
    };

    
    const result = await createStudentUseCase.handler(student);

    
    expect(studentRepository.create).toHaveBeenCalledWith(student);

    // Verifica o resultado retornado
    expect(result).toEqual({
      id_student: '1',
      id_person: 'person-school-fiap',
      grade: 'A',
    });
  });
});

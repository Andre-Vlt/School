import { describe, it, expect, vi } from 'vitest';
import { CreateTeacherUseCase } from 'src/use-cases/create-teacher-use-case';
import { ITeacherRepository } from 'src/repositories/interfaces/teacher-repository-interface';
import { ITeacher } from 'src/entities/teacher.interface';

describe('CreateTeacherUseCase', () => {
  it('should call teacherRepository.create with the correct teacher', async () => {
    // Mock do repositório
    const teacherRepository: ITeacherRepository = {
      create: vi.fn().mockResolvedValueOnce({
        id_teacher: '1',
        id_person: 'person-school-fiap',
        id_subject: 101,
      }),
    };

    // Instancia o caso de uso com o mock
    const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository);

    // Mock do professor
    const teacher: ITeacher = {
      id_person: 'person-school-fiap',
      id_subject: 101,
    };

    
    const result = await createTeacherUseCase.handler(teacher);

    
    expect(teacherRepository.create).toHaveBeenCalledWith(teacher);

    // Verifica o resultado retornado
    expect(result).toEqual({
      id_teacher: '1',
      id_person: 'person-school-fiap',
      id_subject: 101,
    });
  });
});

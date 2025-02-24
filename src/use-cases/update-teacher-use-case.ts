import { ITeacher } from "src/entities/teacher.interface";
import { ITeacherRepository } from "src/repositories/interfaces/teacher-repository-interface";
import { UpdateTeacher } from "src/repositories/teacher-repository";

export class UpdateTeacherUseCase{
    constructor(private teacherRepository: ITeacherRepository) {}

    async handler({id_teacher, id_subject, teacher_name}: UpdateTeacher): Promise<UpdateTeacher | undefined>{
        return this.teacherRepository.updateTeacher({ id_teacher, id_subject, teacher_name})
    }
}

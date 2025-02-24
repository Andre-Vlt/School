import { TeacherRepository } from "src/repositories/teacher-repository";
import { UpdateTeacherUseCase } from "../update-teacher-use-case";

export function makeUpdateTeacherUseCase(){
    const teacherRepository = new TeacherRepository();
    const updateTeacherUseCase = new UpdateTeacherUseCase(teacherRepository);

    return updateTeacherUseCase;
}
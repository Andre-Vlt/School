import { TeacherRepository } from "src/repositories/teacher-repository";
import { GetAllTeachersUseCase } from "../get-all-teachers-use-case";


export function makeGetAllTeachersUseCase() {
    const teacherRepository = new TeacherRepository();

    const getAllTeachersUseCase = new GetAllTeachersUseCase(teacherRepository);

    return getAllTeachersUseCase;
}
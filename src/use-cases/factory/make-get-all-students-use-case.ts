import { StudentRepository } from "src/repositories/student-repository";
import { GetAllStudentsUseCase } from "../get-all-students-use-case";

export function makeGetAllStudentsUseCase(){
    const studentRepository = new StudentRepository();
    const getAllStudentsUseCase = new GetAllStudentsUseCase(studentRepository);

    return getAllStudentsUseCase;
}
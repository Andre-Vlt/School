import { StudentRepository } from "src/repositories/student-repository";
import { UpdateStudentUseCase } from "../update-student-use-case";

export function makeUpdateStudentUseCase() {
    const studentsRepository = new StudentRepository();
    const updateStudentUseCase = new UpdateStudentUseCase(studentsRepository);
    return updateStudentUseCase;
}
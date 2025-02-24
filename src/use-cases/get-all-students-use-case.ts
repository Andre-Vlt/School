import { IStudentRepository } from "src/repositories/interfaces/student-repository-interface";

export class GetAllStudentsUseCase{
    constructor(private studentRepository: IStudentRepository) { }
    async handler() {
        return this.studentRepository.getAllStudents();
    }
}
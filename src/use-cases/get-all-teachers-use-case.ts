import { ITeacherRepository } from "src/repositories/interfaces/teacher-repository-interface";

export class GetAllTeachersUseCase {
    constructor(private teacherRepository: ITeacherRepository) { }
    async handler() {
        return this.teacherRepository.getAllTeachers();
    }
}
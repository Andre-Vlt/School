import { IStudentRepository } from "src/repositories/interfaces/student-repository-interface";
import { UpdateStudent } from "src/repositories/student-repository";

export class UpdateStudentUseCase{
    constructor(private studentRepository: IStudentRepository){}
    async handler({id_person, grade, student_name}: UpdateStudent): Promise<UpdateStudent | undefined>{
        return this.studentRepository.updateStudent({id_person, grade, student_name});
    }
}
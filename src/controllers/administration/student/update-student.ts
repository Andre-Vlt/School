import express from 'express'
import { makeUpdateStudentUseCase } from 'src/use-cases/factory/make-update-student-use-case';
import { z } from 'zod';
export async function updateStudent(
    req: express.Request,
    res: express.Response
){
    const registerParamsSchema = z.object({
        id_person: z.coerce.string(),
    })

    const registerBodySchema = z.object({
        grade: z.string(),
        student_name: z.string()
    })

    const { id_person } = registerParamsSchema.parse(req.params)

    const { grade, student_name } = registerBodySchema.parse(req.body)

    const updateStudentUseCase = makeUpdateStudentUseCase()

    const student = await updateStudentUseCase.handler({
        id_person,
        grade,
        student_name
    })

    return res.status(201).send(student)
}
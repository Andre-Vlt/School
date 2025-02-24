import express from 'express'
import { makeUpdateTeacherUseCase } from 'src/use-cases/factory/make-update-teacher-use-case'
import { z } from 'zod'

export async function updateTeacher(
    req: express.Request,
    res: express.Response
){
    const registerParamsSchema = z.object({
        id_teacher: z.coerce.string(),
    })

    const registerBodySchema = z.object({
        teacher_name: z.string(),
        id_subject: z.number()
    })

    const { id_teacher } = registerParamsSchema.parse(req.params)
    const { teacher_name, id_subject } = registerBodySchema.parse(req.body)

    const updateTeacherUseCase = makeUpdateTeacherUseCase()
    const teacher = await updateTeacherUseCase.handler({
        id_teacher,
        teacher_name,
        id_subject
    })

    return res.status(201).send(teacher)
}
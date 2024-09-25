import { z } from 'zod'
import express from 'express'
import { makeCreateTeacherUseCase } from 'src/use-cases/factory/make-create-teacher-use-case'

export async function createTeacher(
  req: express.Request,
  res: express.Response,
) {
  const registerBodySchema = z.object({
    id_person: z.string(),
    id_subject: z.coerce.number(),
  })

  const { id_person, id_subject } = registerBodySchema.parse(req.body)

  const createTeacherUseCase = makeCreateTeacherUseCase()

  const teacher = await createTeacherUseCase.handler({
    id_person,
    id_subject,
  })

  return res.status(201).send(teacher)
}

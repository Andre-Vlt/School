import express from 'express'
import { makeCreateStudentUseCase } from 'src/use-cases/factory/make-create-student-use-case'
import { z } from 'zod'

export async function createStudent(
  req: express.Request,
  res: express.Response,
) {
  const registerBodySchema = z.object({
    id_person: z.string(),
    grade: z.string().default('0'),
  })

  const { id_person, grade } = registerBodySchema.parse(req.body)

  const createStudentUseCase = makeCreateStudentUseCase()

  const student = await createStudentUseCase.handler({
    id_person,
    grade,
  })

  return res.status(201).send(student)
}

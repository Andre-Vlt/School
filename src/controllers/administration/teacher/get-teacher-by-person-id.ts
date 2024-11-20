import express from 'express'
import { makeGetTeacherByPersonIdUseCase } from 'src/use-cases/factory/make-get-teacher-by-person-id-use-case'
import { z } from 'zod'
export async function getTeacherByPersonId(
  req: express.Request,
  res: express.Response,
) {
  const registerParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = registerParamsSchema.parse(req.params)

  const getTeacherByPersonIdUseCase = makeGetTeacherByPersonIdUseCase()
  const teacher = await getTeacherByPersonIdUseCase.handler(id)
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' })
  }
  return res.status(200).send(teacher)
}

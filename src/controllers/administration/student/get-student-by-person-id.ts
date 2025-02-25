import express from 'express'
import { makeGetStudentByPersonIdUseCase } from 'src/use-cases/factory/make-get-student-by-person-id-use-case'

import { z } from 'zod'
export async function getStudentByPersonId(
  req: express.Request,
  res: express.Response,
) {
  const registerParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = registerParamsSchema.parse(req.params)

  const getStudentByPersonIdUseCase = makeGetStudentByPersonIdUseCase()
  const student = await getStudentByPersonIdUseCase.handler(id)
  if (!student) {
    return res.status(404).json({ message: 'Student not found' })
  }
  return res.status(200).send(student)
}

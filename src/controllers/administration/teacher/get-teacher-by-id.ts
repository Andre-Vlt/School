import express from 'express'
import { makeGetTeacherByIdUseCase } from 'src/use-cases/factory/make-get-teacher-by-id-use-case'
import { z } from 'zod'

export async function getTeacherById(
  req: express.Request,
  res: express.Response,
) {
  const registerParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = registerParamsSchema.parse(req.params)

  const getTeacherByIdUseCase = makeGetTeacherByIdUseCase()

  try {
    const teacher = await getTeacherByIdUseCase.handler(id)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' })
    }

    return res.status(200).send(teacher)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message })
    }
    return res.status(400).send({ message: 'An unknown error occurred' })
  }
}

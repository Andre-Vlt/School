import express from 'express'
import { makeGetPersonByUserIdUseCase } from 'src/use-cases/factory/make-get-person-by-user-id'
import { z } from 'zod'
export async function getPersonByUserId(
  req: express.Request,
  res: express.Response,
) {
  const registerParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = registerParamsSchema.parse(req.params)

  const getPersonByUserIdUseCase = makeGetPersonByUserIdUseCase()
  const person = await getPersonByUserIdUseCase.handler(id)

  if (!person) {
    return res.status(404).json({ message: 'Person not found' })
  }
  return res.status(200).send(person)
}

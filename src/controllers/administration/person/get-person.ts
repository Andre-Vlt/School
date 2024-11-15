import express from 'express'
import { makeGetPersonUseCase } from 'src/use-cases/factory/make-get-person-use-case'
import { z } from 'zod'

export async function getPersonById(
  req: express.Request,
  res: express.Response,
) {
  const registerParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = registerParamsSchema.parse(req.params)

  const getPersonUseCase = makeGetPersonUseCase()

  const person = await getPersonUseCase.handler(id)

  return res.status(200).send(person)
}

import express from 'express'
import { makeCreatePersonUseCase } from 'src/use-cases/factory/make-create-person-use-case'
import { z } from 'zod'
export async function createPerson(
  req: express.Request,
  res: express.Response,
) {
  const registerBodySchema = z.object({
    id_user: z.string(),
    name: z.string(),
    email: z.string().email(),
    birth: z.coerce.date(),
    cpf: z.string().max(11),
  })

  const { id_user, name, email, birth, cpf } = registerBodySchema.parse(
    req.body,
  )

  const createPersonUseCase = makeCreatePersonUseCase()

  const person = await createPersonUseCase.handler({
    id_user,
    name,
    email,
    birth,
    cpf,
  })

  return res.status(201).send(person)
}

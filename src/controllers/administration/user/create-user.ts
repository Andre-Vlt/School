import express from 'express'
import { makeCreateUserUseCase } from 'src/use-cases/factory/make-create-user-use-case'
import { z } from 'zod'

export async function createUser(req: express.Request, res: express.Response) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(req.body)

  const createUserUseCase = makeCreateUserUseCase()

  const user = await createUserUseCase.handler({
    username,
    password,
  })

  return res.status(201).send(user)
}

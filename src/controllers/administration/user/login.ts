import express from 'express'
import { makeFindUserByUsernameUseCase } from 'src/use-cases/factory/make-find-user-by-username-use-case'
import { z } from 'zod'

export async function login(req: express.Request, res: express.Response) {
  const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  try {
    const { username, password } = loginSchema.parse(req.body)
    const loginUseCase = makeFindUserByUsernameUseCase()
    const user = await loginUseCase.handler(username, password)

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    return res.status(200).send(user)
  } catch (error) {
    return res.status(400).json({ message: error })
  }
}

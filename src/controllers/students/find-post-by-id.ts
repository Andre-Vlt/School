import express from 'express'
import { makeFindPostByIdUseCase } from 'src/use-cases/factory/make-find-post-by-id-use-case'
import { z } from 'zod'

export async function FindPostById(
  req: express.Request,
  res: express.Response,
) {
  const registerParamsSchema = z.object({
    id_post: z.coerce.number(),
  })

  const { id_post } = registerParamsSchema.parse(req.params)

  const findPostByIdUseCase = makeFindPostByIdUseCase()

  const post = await findPostByIdUseCase.handler(id_post)

  return res.status(200).send(post)
}

import { makeDeletePostUseCase } from 'src/use-cases/factory/make-delete-post-use-case'
import { z } from 'zod'
import express from 'express'

export async function deletePost(req: express.Request, res: express.Response) {
  const registerParamsSchema = z.object({
    id_post: z.coerce.number(),
  })

  const { id_post } = registerParamsSchema.parse(req.params)

  const deletePostUseCase = makeDeletePostUseCase()

  await deletePostUseCase.handler(id_post)

  return res.status(201)
}

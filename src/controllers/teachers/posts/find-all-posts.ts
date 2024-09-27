import express from 'express'
import { makeFindAllPostsUseCase } from 'src/use-cases/factory/make-find-all-posts-use-case'
import { z } from 'zod'

export async function findAllPosts(
  req: express.Request,
  res: express.Response,
) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(5),
  })

  const { page, limit } = registerQuerySchema.parse(req.query)

  const findAllPostsUseCase = makeFindAllPostsUseCase()

  const posts = await findAllPostsUseCase.handler(page, limit)

  return res.status(200).send(posts)
}

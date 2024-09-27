import express from 'express'
import { makeSearchPostUseCase } from 'src/use-cases/factory/make-search-post-use-case'
import { z } from 'zod'

export async function KeywordSearchPost(
  req: express.Request,
  res: express.Response,
) {
  const registerQuerySchema = z.object({
    keyword: z.string(),
  })

  const { keyword } = registerQuerySchema.parse(req.query)

  const searchPostUseCase = makeSearchPostUseCase()

  const posts = (await searchPostUseCase).handler(keyword)

  return res.status(200).send(posts)
}

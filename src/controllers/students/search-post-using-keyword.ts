import express from 'express'
import { makeSearchPostUseCase } from 'src/use-cases/factory/make-search-post-use-case'
import { z } from 'zod'

export async function KeywordSearchPost(
  req: express.Request,
  res: express.Response,
) {
  const registerQuerySchema = z.object({
    keyWord: z.string(),
  })

  const { keyWord } = registerQuerySchema.parse(req.query)

  const searchPostUseCase = await makeSearchPostUseCase()

  const posts = await searchPostUseCase.handler(keyWord)

  return res.status(200).send(posts)
}

import express from 'express'
import { makeCreatePostUseCase } from 'src/use-cases/factory/make-create-post-use-case'
import { z } from 'zod'

export async function createPost(req: express.Request, res: express.Response) {
  const registerBodySchema = z.object({
    id_teacher: z.string(),
    id_subject: z.coerce.number(),
    post_text: z.string(),
    post_title: z.string(),
    post_date: z.coerce.date().default(() => new Date()),
  })

  const { id_teacher, id_subject, post_text, post_title, post_date } =
    registerBodySchema.parse(req.body)

  const createPostUseCase = makeCreatePostUseCase()

  const post = await createPostUseCase.handler({
    id_teacher,
    id_subject,
    post_text,
    post_title,
    post_date,
  })

  return res.status(201).send(post)
}

import express from 'express'
import { makeUpdatePostUseCase } from 'src/use-cases/factory/make-update-post-use-case'
import { z } from 'zod'

export async function updatePost(req: express.Request, res: express.Response) {
  const registerParamsSchema = z.object({
    id_post: z.coerce.number(),
  })

  const registerBodySchema = z.object({
    id_teacher: z.string(),
    id_subject: z.coerce.number(),
    post_text: z.string(),
    post_title: z.string(),
    post_date: z.coerce.date().default(() => new Date()),
  })

  const { id_post } = registerParamsSchema.parse(req.params)

  const { id_teacher, id_subject, post_text, post_title, post_date } =
    registerBodySchema.parse(req.body)

  const updatePostUseCase = makeUpdatePostUseCase()

  const post = await updatePostUseCase.handler({
    id_post,
    id_teacher,
    id_subject,
    post_text,
    post_title,
    post_date,
  })

  return res.status(201).send(post)
}

import { z } from 'zod'
import express from 'express'
import { createTeacher } from 'src/dao/teacher.dao'
import { createStudent } from 'src/dao/student.dao'
import { createPerson } from 'src/dao/person.dao'

export async function CreateTeacher(
  req: express.Request,
  res: express.Response,
) {
  const registerBodySchema = z.object({
    id_person: z.string(),
    id_subject: z.coerce.number(),
  })

  const { id_person, id_subject } = registerBodySchema.parse(req.body)

  const creatingTeacher = await createTeacher({ id_person, id_subject })

  return res.status(201).send(creatingTeacher)
}

// ============================================
export const CreateStudent = async (
  req: express.Request,
  res: express.Response,
) => {
  const registerBodySchema = z.object({
    id_person: z.string(),
    grade: z.string().default('0'),
  })

  const { id_person, grade } = registerBodySchema.parse(req.body)

  const creatingStudent = await createStudent({ id_person, grade })

  return res.status(201).send(creatingStudent)
}

// ==========================================
export const CreatePerson = async (
  req: express.Request,
  res: express.Response,
) => {
  const registerBodySchema = z.object({
    id_user: z.string(),
    name: z.string(),
    email: z.string().email(),
    birth: z.date(),
    cpf: z.string().max(11),
  })

  const { id_user, name, birth, cpf, email } = registerBodySchema.parse(
    req.body,
  )

  const creatingPerson = await createPerson({
    id_user,
    name,
    birth,
    cpf,
    email,
  })

  return res.status(201).send(creatingPerson)
}

// ==========================================

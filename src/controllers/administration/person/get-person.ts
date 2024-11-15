import express from 'express'
import { makeGetPersonUseCase } from 'src/use-cases/factory/make-get-person-use-case'

export async function getPerson(req: express.Request, res: express.Response) {
  const getPersonUseCase = makeGetPersonUseCase()

  const person = await getPersonUseCase.handler()

  return res.status(200).send(person)
}

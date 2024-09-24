import { IPerson } from '../person.interface'

export class Person implements IPerson {
  id_person?: string | undefined
  id_user: string
  name: string
  email: string
  birth: Date
  cpf: string

  constructor(
    id_user: string,
    name: string,
    email: string,
    birth: Date,
    cpf: string,
  ) {
    this.id_user = id_user
    this.name = name
    this.email = email
    this.birth = birth
    this.cpf = cpf
  }
}

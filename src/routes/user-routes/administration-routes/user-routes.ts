import { Router } from 'express'
import { createUser } from 'src/controllers/administration/user/create-user'

const admRouter = Router()

admRouter.post('/user', createUser)

export default admRouter

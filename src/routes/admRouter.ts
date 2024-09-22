import {
  CreateStudent,
  CreateTeacher,
} from '../controllers/administration/administration-controller'
import { Router } from 'express'

const admRouter = Router()

admRouter.post('/student', CreateStudent)
admRouter.post('/teacher', CreateTeacher)

export default admRouter

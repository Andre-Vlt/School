import { Router } from 'express'
import { createPerson } from 'src/controllers/administration/person/create-person'
import { getPersonById } from 'src/controllers/administration/person/get-person'
import { createStudent } from 'src/controllers/administration/student/create-student'
import { createTeacher } from 'src/controllers/administration/teacher/create-teacher'
import { createUser } from 'src/controllers/administration/user/create-user'

const admRouter = Router()

admRouter.post('/user', createUser)
admRouter.post('/person', createPerson)
admRouter.post('/teacher', createTeacher)
admRouter.post('/student', createStudent)
admRouter.get('/person:id', getPersonById)

export default admRouter

import { Router } from 'express'
import { createPerson } from 'src/controllers/administration/person/create-person'
import { getPersonById } from 'src/controllers/administration/person/get-person'
import { getPersonByUserId } from 'src/controllers/administration/person/get-person-by-user-id'
import { createStudent } from 'src/controllers/administration/student/create-student'
import { createTeacher } from 'src/controllers/administration/teacher/create-teacher'
import { getTeacherById } from 'src/controllers/administration/teacher/get-teacher-by-id'
import { getTeacherByPersonId } from 'src/controllers/administration/teacher/get-teacher-by-person-id'
import { createUser } from 'src/controllers/administration/user/create-user'
import { login } from 'src/controllers/administration/user/login'

const admRouter = Router()

admRouter.post('/user', createUser)

admRouter.post('/person', createPerson)
admRouter.get('/person/userid/:id', getPersonByUserId)
admRouter.get('/person/:id', getPersonById)

admRouter.post('/teacher', createTeacher)
admRouter.get('/teacher/:id', getTeacherById)
admRouter.get('/teacher/person/:id', getTeacherByPersonId)

admRouter.post('/student', createStudent)

admRouter.post('/user/login', login)

export default admRouter

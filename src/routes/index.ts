import { Router } from 'express'
import admRouter from './administration-routes/adm-routes'
import teacherRouter from './teacher-routes/teacher-routes'
import studentRoutes from './students-routes/student-routes'

const routes = Router()

routes.use('/adm', admRouter)
routes.use('/teacher', teacherRouter)
routes.use('/student', studentRoutes)

export default routes

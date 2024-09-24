import { Router } from 'express'
import admRouter from './user-routes/administration-routes/user-routes'

const routes = Router()

routes.use('/adm', admRouter)

export default routes

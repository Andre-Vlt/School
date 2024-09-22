import { Router } from 'express'
import admRouter from './admRouter'

const router = Router()

router.use('/adm', admRouter)

export default router

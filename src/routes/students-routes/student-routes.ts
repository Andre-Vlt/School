import { Router } from 'express'
import { FindPostById } from 'src/controllers/students/find-post-by-id'
import { findAllPosts } from 'src/controllers/teachers/posts/find-all-posts'

const studentRoutes = Router()

studentRoutes.get('/posts', findAllPosts)
studentRoutes.get('/posts/:id_post', FindPostById)
studentRoutes.get('/posts/search', FindPostById)

export default studentRoutes

import { Router } from 'express'
import { getAllTeachers } from 'src/controllers/administration/teacher/get-all-teachers'
import { createPost } from 'src/controllers/teachers/posts/create-post'
import { deletePost } from 'src/controllers/teachers/posts/delete-post'
import { findAllPosts } from 'src/controllers/teachers/posts/find-all-posts'
import { updatePost } from 'src/controllers/teachers/posts/update-post'

const teacherRouter = Router()

teacherRouter.post('/post', createPost)
teacherRouter.delete('/post/:id_post', deletePost)
teacherRouter.put('/post/:id_post', updatePost)
teacherRouter.get('/posts', findAllPosts)
teacherRouter.get('/', getAllTeachers)

export default teacherRouter

import { Router } from 'express'
import { getAllStudents } from 'src/controllers/administration/student/get-all-students'
import { updateStudent } from 'src/controllers/administration/student/update-student'
import { FindPostById } from 'src/controllers/students/find-post-by-id'
import { KeywordSearchPost } from 'src/controllers/students/search-post-using-keyword'
import { findAllPosts } from 'src/controllers/teachers/posts/find-all-posts'

const studentRoutes = Router()

studentRoutes.get('/posts', findAllPosts)
studentRoutes.get('/posts/:id_post', FindPostById)
studentRoutes.get('/search', KeywordSearchPost)
studentRoutes.get('/', getAllStudents)
studentRoutes.put('/:id_person', updateStudent)

export default studentRoutes

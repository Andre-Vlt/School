import { Router } from 'express'
import { FindPostById } from 'src/controllers/students/find-post-by-id'
import { KeywordSearchPost } from 'src/controllers/students/search-post-using-keyword'
import { findAllPosts } from 'src/controllers/teachers/posts/find-all-posts'

const studentRoutes = Router()

/**
 * @swagger
 * /student/posts:
 *  get:
 *      summary: Returns all posts
 *      responses:
 *          200:
 *           description: A list of posts
 *           content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                             title:
 *                                 type: string
 *                            content:
 *                               type: string
 *  post:
 *    summary: Create a new post
 *    requestBody:
 *     required: true
 *    content:
 *    application/json:
 *     schema:
 *     type: object
 *    properties:
 *    title:
 *     type: string
 *    content:
 *     type: string
 *   responses:
 *      201:
 *          description: Post created
 *     400:
 *        description: Bad request
 * **/

studentRoutes.get('/posts', findAllPosts)
studentRoutes.get('/posts/:id_post', FindPostById)
studentRoutes.get('/search', KeywordSearchPost)

export default studentRoutes

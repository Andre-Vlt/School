import express from 'express'
import routes from 'src/routes/index'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from 'src/swagger-output.json'
import cors from 'cors'

export const app = express()
app.use(cors())
app.use(express.json())

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

app.use('/', routes)

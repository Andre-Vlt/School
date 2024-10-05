import { app } from './app'
import { env } from 'src/env/index'

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${env.PORT} `)
})

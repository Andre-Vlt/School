import { app } from './app'
import { env } from 'src/env/index'

app.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT} `)
})

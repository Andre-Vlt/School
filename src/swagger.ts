import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'API',
    description: 'API',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
}

const outputFile = './src/swagger-output.json'
const endpointsFiles = ['./src/routes/index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)

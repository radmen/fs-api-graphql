const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const fileSchema = require('./schema/file')
const schema = require('./schema')

const app = express()
app.use(bodyParser.json())

app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
})


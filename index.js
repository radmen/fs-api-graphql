const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

const app = express()
app.use(bodyParser.json())

const files = [
    'foo.jpg',
    'bar.jpg'
]

const typeDefs = `
    type File { path: String!, content: String! }

    type Query {
        list: [File]!
    }
`

const resolvers = {
    Query: {
        list: () => files.map(path => ({ path }))
    },

    File: {
        content: () => 'lol'
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
})

const R = require('ramda')
const { makeExecutableSchema } = require('graphql-tools')

const modules = [
  require('./fileNode'),
  require('./file'),
  require('./dir')
]

const mergeSchema = R.join('\n')

const mergeTypes = R.pipe(
  R.map(R.propOr('', 'types')),
  mergeSchema
)

const mergeQueries = R.pipe(
  R.map(R.propOr('', 'queries')),
  mergeSchema,
  schema => (`
    type Query {
      ${schema}
    }
  `)
)

const mergeResolvers = R.pipe(
  R.map(R.pipe(
    R.propOr({}, 'resolvers'),
    R.juxt([R.omit('Query'), R.propOr({}, 'Query')])
  )),
  R.reduce(
    (carry, [resolvers, Query]) => ({
      ...carry,
      ...resolvers,
      Query: {
        ...carry.Query,
        ...Query
      }
    }),
    { Query: {} }
  )
)

module.exports = makeExecutableSchema({
  typeDefs: [
    mergeTypes(modules),
    mergeQueries(modules)
  ],
  resolvers: mergeResolvers(modules)
})

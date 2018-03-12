const fs = require('fs')
const { promisify } = require('util')

const Query = `
    type Query {
        list(
            """
            Name of the directory to be listed.

            Default to servers CWD.
            """
            dir: String

            """
            Include hidden files
            """
            withHidden: Boolean = true
        ): [File]!
    }
`

const readDir = (dir = process.cwd()) => {
    return promisify(fs.readdir)(dir)
        .then(
            files => files.map(path => ({ path }))
        )
}

module.exports = {
  types: [Query],
  resolvers: {
    Query: {
        list: (obj, args) => {
            const { dir = process.cwd(), withHidden } = args
            const p = withHidden ? (file => file) : (({ path }) => !path.startsWith('.'))

            return readDir(dir)
                .then(files => files.filter(p))
        }
    }
  }
}

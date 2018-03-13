const fs = require('fs')
const R = require('ramda')
const { promisify } = require('util')

const types = `
    type File { 
        """
        Name of file with extension
        """
        path: String!
    }
`

const queries = `
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
`

const readDir = (dir = process.cwd()) => {
    return promisify(fs.readdir)(dir)
        .then(
            files => files.map(path => ({ path }))
        )
}

const createHiddenFilesFilter = withHidden => 
  R.filter(withHidden
    ? R.identity
    : R.compose(R.complement(R.startsWith('.')), R.prop('path'))
  )

const resolvers = {
  Query: {
    list: (_, args) => {
      const { dir = process.cwd(), withHidden } = args

      return readDir(dir)
          .then(createHiddenFilesFilter(withHidden))
    }
  }
}

module.exports = { types, resolvers, queries }

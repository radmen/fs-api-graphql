const readDir = require('../util/readDir')
const { hiddenFilesFilter } = require('../util/filters')

const types = `
  interface FileNode {
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
  ): [FileNode]!
`

const resolvers = {
  Query: {
    list: (_, args) => {
      const { dir = process.cwd(), withHidden } = args

      return readDir(dir)
          .then(hiddenFilesFilter(withHidden))
    }
  },

  FileNode: {
    __resolveType (node) {
      return node.constructor.name
    }
  }
}

module.exports = { types, queries, resolvers }

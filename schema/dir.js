const readDir = require('../util/readDir')
const { hiddenFilesFilter } = require('../util/filters')

const types = `
  type Dir implements FileNode {
    """
    Name of file with extension
    """
    path: String!

    """
    List of files inside directory
    """
    files(
      withHidden: Boolean = true
    ): [FileNode]!
  }
`

const resolvers = {
  Dir: {
    files (dir, args) {
      const { withHidden } = args

      return readDir(dir.path)
        .then(hiddenFilesFilter(withHidden))
    }
  }
}

module.exports = { types, resolvers }

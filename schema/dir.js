const readDir = require('../util/readDir')

const types = `
  type Dir implements FileNode {
    """
    Name of file with extension
    """
    path: String!

    """
    List of files inside directory
    """
    files: [FileNode]!
  }
`

const resolvers = {
  Dir: {
    files (dir) {
      return readDir(dir.path)
    }
  }
}

module.exports = { types, resolvers }

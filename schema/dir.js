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
}

module.exports = { types, resolvers }

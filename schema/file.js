const types = `
  type File implements FileNode { 
    """
    Name of file with extension
    """
    path: String!

    """
    Contents of file
    """
    contents: String!
  }
`

const resolvers = {
}

module.exports = { types, resolvers }

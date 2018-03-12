const File = `
    type File { 
        """
        Name of file with extension
        """
        path: String!
    }
`

module.exports = {
  types: [File],
  resolvers: {}
}

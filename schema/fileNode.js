const R = require('ramda')
const fs = require('fs')
const { promisify } = require('util')
const File = require('../type/File')
const Dir = require('../type/Dir')

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

const stat = promisify(fs.stat)

const isDir = path => stat(path)
  .then(stats => stats.isDirectory())

const resolveFileNode = path => isDir(path)
  .then(directory => directory ? new Dir(path) : new File(path))

const readDir = (dir = process.cwd()) => {
  return promisify(fs.readdir)(dir)
    .then(
        files => Promise.all(files.map(resolveFileNode))
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
  },

  FileNode: {
    __resolveType (node) {
      return node.constructor.name
    }
  }
}

module.exports = { types, queries, resolvers }

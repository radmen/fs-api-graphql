const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const File = require('../type/File')
const Dir = require('../type/Dir')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const isDir = path => stat(path)
  .then(stats => stats.isDirectory())

const resolveFileNode = dirname => async filePath => {
  const fullPath = path.join(dirname, filePath)
  const directory = await isDir(fullPath)

  return directory
    ? new Dir(fullPath)
    : new File(fullPath)
}

module.exports = (dir = process.cwd()) => {
  return readdir(dir).then(
    files => Promise.all(files.map(resolveFileNode(dir)))
  )
}

const fs = require('fs')
const { promisify } = require('util')
const FileNode = require('./FileNode')

const readFile = promisify(fs.readFile)

class File extends FileNode {
  get contents () {
    return readFile(this.path)
      .then(buffer => buffer.toString())
  }
}

module.exports = File

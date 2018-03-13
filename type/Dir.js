const fs = require('fs')
const { promisify } = require('util')
const FileNode = require('./FileNode')

class Dir extends FileNode {
  get files () {
    return []
  }
}

module.exports = Dir

const R = require('ramda')
const path = require('path')

const notStartsWith = R.complement(R.startsWith)

const hiddenFilesFilter = withHidden => R.filter(withHidden
  ? R.T
  : R.compose(notStartsWith('.'), path.basename, R.prop('path'))
)

module.exports = { hiddenFilesFilter }

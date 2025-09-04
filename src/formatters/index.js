import stylish from './stylish.js'
import plain from './plain.js'

const formatters = {
  stylish,
  plain,
  json: diff => JSON.stringify(diff, null, 2),
}

export default (diff, formatName) => formatters[formatName](diff)

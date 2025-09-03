import formatStylish from './stylish.js'
import formatPlain from './plain.js'

export default (diff, formatName) => {
  if (formatName === 'stylish') {
    return formatStylish(diff)
  }
  else if (formatName === 'plain') {
    return formatPlain(diff)
  }
}

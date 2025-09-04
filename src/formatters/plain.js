import _ from 'lodash'

const getValue = (value) => {
  if (_.isBoolean(value) || _.isNull(value) || _.isNumber(value)) {
    return value
  }
  else if (_.isString(value)) {
    return `'${value}'`
  }
  return `[complex value]`
}

const createLine = (nodes, parentName = '') => {
  const { name, type, value, value1, value2, children } = nodes
  const currentPath = `${parentName}${name}`
  const startingPhrase = `Property '${currentPath}'`
  switch (type) {
    case 'equal':
      return
    case 'added':
      return `${startingPhrase} was added with value: ${getValue(value)}\n`
    case 'removed':
      return `${startingPhrase} was removed\n`
    case 'nested':
      return children.map(child => createLine(child, `${currentPath}.`)).join('')
    case 'changed':
      return `${startingPhrase} was updated. From ${getValue(value1)} to ${getValue(value2)}\n`
    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

export default (diff) => {
  const lines = diff.map(node => createLine(node))
  return lines.join('').trim()
}

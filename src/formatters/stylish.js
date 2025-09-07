import _ from 'lodash'

const specialSymbol = {
  added: '+ ',
  removed: '- ',
  equal: '  ',
  changed: '  ',
  nested: '  ',
}

const replacer = ' '
const indentionCount = 4

const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data
  }

  const indentSize = depth * indentionCount
  const indent = replacer.repeat(indentSize)
  const bracketIndent = replacer.repeat(indentSize - indentionCount) // -4 для скобок, так как они находятся на -1 вложенности

  const lines = Object.keys(data).map((key) => {
    const value = data[key]

    if (_.isPlainObject(value)) {
      return `${indent}${key}: ${stringify(value, depth + 1)}`
    }
    return `${indent}${key}: ${value}`
  })
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n')
}

const iter = (node, depth = 1) => {
  const indentSize = depth * indentionCount
  const indent = replacer.repeat(indentSize - 2) // -2 для спецсимволов
  const bracketIndent = replacer.repeat(indentSize) //  для скобок, так как они находятся на +1 вложенности

  const { name, type, value, value1, value2, children } = node
  const symbol = specialSymbol[type]

  if (!Object.hasOwn(specialSymbol, type)) throw new Error(`Unknown file type: ${type}`)

  if (type === 'changed') {
    const plus = specialSymbol.added
    const minus = specialSymbol.removed
    const removedValue = stringify(value1, depth + 1)
    const addedValue = stringify(value2, depth + 1)
    return `\n${indent}${minus}${name}: ${removedValue}\n${indent}${plus}${name}: ${addedValue}`
  }

  if (type === 'nested') {
    const nestedValue = children.map(child => iter(child, depth + 1)).join('')
    return `\n${indent}${symbol}${name}: {${nestedValue}\n${bracketIndent}}`
  }

  return `\n${indent}${symbol}${name}: ${stringify(value, depth + 1)}`
}

export default (nodes) => {
  const lines = nodes.map(node => iter(node))
  return `{${lines.join('')}\n}`
}

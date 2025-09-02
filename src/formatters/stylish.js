const specialSymbol = {
    added: '+.',
    removed: '-.',
    equal: '  ',
    modified: '  ',
}

const iter = (value,depth = 1, indentionCount = 4, replacer = '.') => {
  const indentSize =  depth * indentionCount 
  const currentIndent = replacer.repeat(indentSize - 2)
  const bracketIndent = replacer.repeat(indentSize - indentionCount)

  const lines = value.map(node => {
    const { name, type, status, children, value } = node
    const specSymbol = specialSymbol[status]
    
    if (type === 'plain') {
      return `${currentIndent}${specSymbol}${name}: ${value}`
    }
    else if (type === 'nested' && status === 'modified') {
      return `${currentIndent}${specSymbol}${name}: ${iter(children, depth + 1)}`
    }
    else {
      return [
        // `${currentIndent}${specSymbol}${name}: {`,
        iter(children, depth + 1),
        `${bracketIndent}}`
        ].join('\n')
    }
    })
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n')
}

export default (dataTree) => iter(dataTree)
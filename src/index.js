import path from 'path'
import fs from 'fs'
import parse from './parser.js'
import getDifference from './treeBuilder.js'
import stylishFormat from './formatters/stylish.js'
import { cwd } from 'process'
import _ from 'lodash'

const getData = (filename) => {
  const filepath = path.resolve(cwd(), filename)
  const rowData = fs.readFileSync(filepath, 'utf-8')
  const format = path.extname(filename)
  const data = parse(rowData, format)
  return data
}

const genDiff = (filename1, filename2, type = 'stylish') => { // тут нужно задать формат по умолчанию
  const data1 = getData(filename1)
  const data2 = getData(filename2)
  const difference = getDifference(data1, data2)
  if (type === 'stylish') {
    return stylishFormat(difference)
  }
}
export default genDiff
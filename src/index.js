import path from 'path'
import fs from 'fs'
import parse from './parser.js'
import getDifference from './treeBuilder.js'
import format from './formatters/index.js'
import { cwd } from 'process'
// import _ from 'lodash'

const getData = (filename) => {
  const filepath = path.resolve(cwd(), filename)
  const rowData = fs.readFileSync(filepath, 'utf-8')
  const format = path.extname(filename)
  const data = parse(rowData, format)
  return data
}

const genDiff = (filename1, filename2, formatName = 'stylish') => {
  const data1 = getData(filename1)
  const data2 = getData(filename2)
  const difference = getDifference(data1, data2)
  return format(difference, formatName)
}
export default genDiff

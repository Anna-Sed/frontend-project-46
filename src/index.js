import path from 'path'
import fs from 'fs'
import parse from './parser.js'
import { cwd } from 'process'
import _ from 'lodash'

const readFile = (filename) => {
  const filepath = path.resolve(cwd(), filename)
  return fs.readFileSync(filepath, 'utf-8')
}

const getDifference = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.sortBy(_.union(keys1, keys2))

  const difference = keys.reduce((acc, key) => {
    if (!(key in data1)) {
      acc += '\n' + `  + ${key}: ${data2[key]}`
    }
    else if (!(key in data2)) {
      acc += '\n' + `  - ${key}: ${data1[key]}`
    }
    else if (data1[key] === data2[key]) {
      acc += '\n' + `    ${key}: ${data1[key]}`
    }
    else {
      acc += '\n' + `  - ${key}: ${data1[key]}`
      acc += '\n' + `  + ${key}: ${data2[key]}`
    }
    return acc
  }, '')
  const result = '{' + difference + '\n}'
  return result
}

export default (filename1, filename2) => {
  const rowData1 = readFile(filename1)
  const rowData2 = readFile(filename2)

  const fileType1 = path.extname(filename1)
  const fileType2 = path.extname(filename2)

  const data1 = parse(rowData1, fileType1)
  const data2 = parse(rowData2, fileType2)
  return getDifference(data1, data2)
}

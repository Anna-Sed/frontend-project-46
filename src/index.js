import path from 'path'
import fs from 'fs'
import parse from './parser.js'
import getDifference from './treeBuilder.js'
import { cwd } from 'process'
import _ from 'lodash'

// const getDifference = (data1, data2) => {
//   const keys1 = Object.keys(data1)
//   const keys2 = Object.keys(data2)
//   const keys = _.sortBy(_.union(keys1, keys2))

//   const difference = keys.reduce((acc, key) => {
//     if (!(key in data1)) {
//       acc += '\n' + `  + ${key}: ${data2[key]}`
//     }
//     else if (!(key in data2)) {
//       acc += '\n' + `  - ${key}: ${data1[key]}`
//     }
//     else if (data1[key] === data2[key]) {
//       acc += '\n' + `    ${key}: ${data1[key]}`
//     }
//     else {
//       acc += '\n' + `  - ${key}: ${data1[key]}`
//       acc += '\n' + `  + ${key}: ${data2[key]}`
//     }
//     return acc
//   }, '')
//   const result = '{' + difference + '\n}'
//   return result
// }

const getData = (filename) => {
  const filepath = path.resolve(cwd(), filename)
  const rowData = fs.readFileSync(filepath, 'utf-8')
  const format = path.extname(filename)
  const data = parse(rowData, format)
  return data
}

const genDiff = (filename1, filename2) => { // тут нужно задать формат по умолчанию
  const data1 = getData(filename1)
  const data2 = getData(filename2)
  return getDifference(data1, data2) 
}
export default genDiff
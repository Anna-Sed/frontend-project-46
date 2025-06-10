import path from 'path'
import fs from 'fs'
import dataParse from './parser.js'
import { cwd } from 'process'
import _ from 'lodash'

const readFile = (filename) => {
  const filepath = path.resolve(cwd(), filename)
  return fs.readFileSync(filepath, 'utf-8')
}

const parse = (file1, file2) => {
  const fileData1 = readFile(file1)
  const fileData2 = readFile(file2)

  const parsingFile1 = dataParse(fileData1)
  const parsingFile2 = dataParse(fileData2)

  const key1 = Object.keys(parsingFile1)
  const key2 = Object.keys(parsingFile2)
  const keys = _.sortBy(_.union(key1, key2))

  const difference = keys.reduce((acc, key) => {
    if (!(key in parsingFile1)) {
      acc += '\n' + `  + ${key}: ${parsingFile2[key]}`
    }
    else if (!(key in parsingFile2)) {
      acc += '\n' + `  - ${key}: ${parsingFile1[key]}`
    }
    else if (parsingFile1[key] === parsingFile2[key]) {
      acc += '\n' + `    ${key}: ${parsingFile1[key]}`
    }
    else {
      acc += '\n' + `  - ${key}: ${parsingFile1[key]}`
      acc += '\n' + `  + ${key}: ${parsingFile2[key]}`
    }
    return acc
  }, '')
  const result = '{' + difference + '\n}'
  return result
}

export default parse

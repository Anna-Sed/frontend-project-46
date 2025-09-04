/* eslint-disable */

import path from 'path'
import fs from 'fs'
import gendiff from '../src/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const expectedStylish = fs.readFileSync(getFixturePath('stylish-result.txt'), 'utf-8').trim()
const expectedPlain = fs.readFileSync(getFixturePath('plain-result.txt'), 'utf-8').trim()
const expectedJson = fs.readFileSync(getFixturePath('json-result.txt'), 'utf-8').trim()


const extensions = ['json', 'yaml', 'yml']

test.each(extensions)(`test %s`, (extension) => {
  const file1Path = getFixturePath(`file1.${extension}`)
  const file2Path = getFixturePath(`file2.${extension}`)

  const defaultResult = gendiff(file1Path, file2Path)
  const stylishResult = gendiff(file1Path, file2Path, 'stylish')
  const plainResult = gendiff(file1Path, file2Path, 'plain')
  const jsonResult = gendiff(file1Path, file2Path, 'json')

  expect(defaultResult).toEqual(expectedStylish)
  expect(stylishResult).toEqual(expectedStylish)
  expect(plainResult).toEqual(expectedPlain)
  expect(jsonResult).toEqual(expectedJson)
})

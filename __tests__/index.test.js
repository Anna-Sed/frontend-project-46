/* eslint-disable */

import path from 'path'
import fs from 'fs'
import gendiff from '../src/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let getFixturePath
let expected
beforeEach(() => {
  getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
  expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8')
})

test('file type json', () => {
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
  expect(result).toEqual(expected.trim())
})

test('typeof result', () => {
  const result = gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')
  expect(result).toEqual(expected.trim())
  expect(typeof result).toBe('string')
})

test('file type yaml and yml', () => {
  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))
  expect(result).toEqual(expected.trim())

  const newresult = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
  expect(newresult).toEqual(expected.trim())
})

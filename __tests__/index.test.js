import path from 'path'
import fs from 'fs'
import gendiff from '../src/index.js'

let getFixturePath
let expected
beforeEach(() => {
  getFixturePath = filename => {
    const __dirname =  path.dirname(filename);
    return path.join(__dirname, '..', '__fixtures__', filename)
  }
  expected = fs.readFileSync(getFixturePath('result.js'), 'utf-8')
})

test('absolute path', () => {
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
  expect(result).toEqual(expected.trim())
})

test('typeof', () => {
  const result = gendiff('file1.json', 'file2.json')
  expect(result).toEqual(expected.trim())
  expect(typeof(result)).toBe('string')
})


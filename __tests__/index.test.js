/* eslint-disable */

import path from 'path'
import fs from 'fs'
import gendiff from '../src/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let getFixturePath
let expectedPlain
let expectedStylish
beforeEach(() => {
  getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
  expectedStylish = fs.readFileSync(getFixturePath('result.txt'), 'utf-8')
  expectedPlain = fs.readFileSync(getFixturePath('plain-result.txt'), 'utf-8')
})

test('json', () => {
  const stylishResult = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')
  const plainResult = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')
  const defaultResult = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))
  expect(stylishResult).toEqual(expectedStylish.trim())
  expect(defaultResult).toEqual(expectedStylish.trim())
  expect(plainResult).toEqual(expectedPlain.trim())
})

test('yml', () => {
  const stylishResult = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')
  const plainResult = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')
  const defaultResult = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))
  expect(stylishResult).toEqual(expectedStylish.trim())
  expect(defaultResult).toEqual(expectedStylish.trim())
  expect(plainResult).toEqual(expectedPlain.trim())
})

test('yaml', () => {
  const stylishResult = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')
  const plainResult = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')
  const defaultResult = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))
  expect(stylishResult).toEqual(expectedStylish.trim())
  expect(defaultResult).toEqual(expectedStylish.trim())
  expect(plainResult).toEqual(expectedPlain.trim())
})
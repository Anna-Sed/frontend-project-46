import dataParse from './parser.js';

const fs = require('fs');
const path = require('path');
const { cwd } = require('node:process');

const readFile = (filename) => {
  const currentDir = cwd();
  const filepath = path.resolve(currentDir, filename);
  return fs.readFileSync(filepath, 'utf-8');
}

export default (file1, file2) => {
  const fileData1 = readFile(file1);
  const fileData2 = readFile(file2);

  const parsingFile1 = dataParse(fileData1);
  const parsingFile12 = dataParse(fileData2);
};
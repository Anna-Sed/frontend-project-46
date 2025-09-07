import yaml from 'js-yaml'

export default (data, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(data)
    case '.yml':
    case '.yaml':
      return yaml.load(data)
    default:
      throw new Error(`Unknown file type: ${fileType}`)
  }
}

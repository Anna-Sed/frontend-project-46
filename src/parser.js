import yaml from 'js-yaml'

export default (data, fileType) => {
  if (fileType === '.json') {
    return JSON.parse(data)
  }
  else if (fileType === '.yml' || fileType === '.yaml') {
    return yaml.load(data)
  }
}

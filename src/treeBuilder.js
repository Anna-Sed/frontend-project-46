import _ from 'lodash'

const buildDiff = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)))

  const diff = sortedKeys.map((key) => {
    const value1 = data1[key]
    const value2 = data2[key]

    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'removed',
        value: value1,
      }
    }
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: value2,
      }
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        name: key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }
    if (_.isEqual(value1, value2)) {
      return {
        name: key,
        type: 'equal',
        value: value1,
      }
    }
    return {
      name: key,
      type: 'changed',
      value1,
      value2,
    }
  })
  return diff
}
export default buildDiff

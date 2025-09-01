import _ from 'lodash'

// const isObject = (data) => _.isObject((data) && !Array.isArray(data))

// const comparePlain = (data1, data2) => {
//   if (data1 === undefined) {
//     return { type: 'added', value2: data2 }
//   }
//   if (data2 === undefined) {
//     return { type: 'removed', value1: data1 }
//   }
//   if (data1 === data2) {
//     return {
//       type: 'equal',
//       value1: data1,
//       value2: data2
//     }
//   }
//   if (data1 !== data2) {

//   }
  
// }

// const compareNested = (data1, data2) =>{
//   if (data1 === undefined) {
//     return {
//       type: 'added',
//       children: getDifference({}, data2)
//     }
//   }
//   if (data2 === undefined) {
//     return {
//       type: 'removed',
//       children: getDifference(data1, {})
//     }
//   }
//   // Если какое-то из значений объект, а второе простое
//   if ((isObject(data1) && !isObject(data2)) || (!isObject(data1) && isObject(data2))) {
//     result.type = 'modified'
//     result.value1 = data1
//     result.value2 = data2
//   }

//   const result = {
//     type: 'modified',
//     children: {}
//   }
//   let isEqual = true

//   const keys1 = Object.keys(data1)
//   const keys2 = Object.keys(data2)
//   const allKeys = _.sortBy(_.union(keys1, keys2))

//   allKeys.forEach(key => {
//     const comparisonResalt = compareNested(data1[key], data2[key])
//     result.children[key] = comparisonResalt
//     if (comparisonResalt.type !== 'equal') {
//       isEqual = false
//     }
//   })

//   if (isEqual) {
//     result.type = 'equal'
//   }
//   if (!isObject(data1) || !isObject(data2)) {
//     return comparePlain(data1, data2)
//   }

//   return result
// }

// const getDifference = (data1, data2) => {
//   return compareNested(data1, data2)
// }

// export default getDifference
const createInitTree = (name, type, status, children = [], value)  => ({
  name,
  type,
  status,
  children,
  value
});





const buildTree = (data1, data2) => {
    const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const packTree = sortedKeys.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      const node = createInitTree(key);

      if (key in data1 && key in data2) { 
        // Оба объекты
        if (_.isObject(value1) && _.isObject(value2)) {
          node.type = 'nested';
          node.status = _.isEqual(value1, value2) ? 'equal' : 'modified'
          node.children = buildTree(value1, value2);
        }
        // оба простых
        else if (!(_.isObject(value1) && _.isObject(value2)) && value1 === value2) {
          node.type = 'plain';
          node.status = 'equal';
          node.value = value1;
        }
        else if (value1 !== value2){
          // если один простой, а второй - объект  
          if (_.isObject(value1) && !_.isObject(value2)) {
            node.type = 'nested'
            node.status = 'removed'
            node.children = buildTree(value1, value2)
            createInitTree(key, 'plain', 'added', [], value2)
          }
          else if (!_.isObject(value1) && _.isObject(value2)){
            node.type = 'nested'
            node.status = 'added'
            node.children = buildTree(value1, value2)
            createInitTree(key, 'plain', 'removed', [], value1)
          }
          // или оба простые
          else {
            node.type = 'plain'
            node.status = 'removed'
            node.value = value1
            createInitTree(key, 'plain', 'added', [], value2)
          }
        } 

        return node;
      }

      if (key in data1 && value2 === undefined) {
        node.status = 'removed';
        if (_.isObject(value1)) {
          node.type = 'nested'
          node.children = buildTree(value1, undefined)
        }
        else {
          node.type = 'plain';
          node.value = value1;
        }
      }

      if (key in data2 && value1 === undefined) {
        node.status = 'added';
        if (_.isObject(value2)) {
          node.type = 'nested'
          node.children = buildTree(undefined, value2) 
        }
        else {
          node.type = 'plain';
          node.value = value2;
        }
      }

      return node;
    });
    return packTree;
  };
export default buildTree
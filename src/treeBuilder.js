import _ from 'lodash'

// const isObject = (data) => _.isObject((data) && !Array.isArray(data))

const createInitTree = (name, type, status, children = [], value)  => ({
  name,
  type,
  status,
  children,
  value
});

const buildTree = (data1, data2) => {
  console.log('Данные 2 = ', data1)
  console.log('Данные 1 = ', data2)
  if (data1 === undefined) data1 = {};
  if (data2 === undefined) data2 = {};
    const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

    const packTree = sortedKeys.map((key) => {
      const value1 = data1[key];
      const value2 = data2[key];
      console.log('Текущий ключ = ', key)
      console.log('Значение 1 = ', value1)
      console.log('Значение 2 = ', value2)
      const node = createInitTree(key);

      if (key in data1 && key in data2) { 
        // Оба объекты
        if (_.isObject(value1) && _.isObject(value2)) {
          node.type = 'nested';
          node.status = _.isEqual(value1, value2) ? 'equal' : 'modified'
          node.children = buildTree(value1, value2);
        }
        // оба простых
        else if (!_.isObject(value1) && value1 === value2) {
          node.type = 'plain';
          node.status = 'equal';
          node.value = value1;
        }
        else if (value1 !== value2){
          // если один простой, а второй - объект  
          // if (_.isObject(value1) && !_.isObject(value2)) {
          //   node.type = 'nested'
          //   node.status = 'removed'
          //   node.children = buildTree(value1, {})
          //   return [
          //     node,
          //     createInitTree(key, 'plain', 'added', [], value2)
          //   ]
          // }
          // else if (!_.isObject(value1) && _.isObject(value2)){
          //   node.type = 'plain'
          //   node.status = 'removed'
          //   node.value = value1
          //   
          //   return [
          //     node,
          //     createInitTree(key, 'nested', 'added', [],buildTree({}, value2) )
          //   ]
          // }
          // или оба простые
          
            node.type = 'nested'
            node.status = 'modified'
            node.children = [
            createInitTree(key, 'plain', 'deleted', [], value1),
            createInitTree(key, 'plain', 'added', [], value2),
          ];
        } 
        console.log('текущая нода если есть два ключа = ', node)
        return node;
      }

      if (key in data1) {
        node.status = 'removed';
        if (_.isObject(value1)) {
          node.type = 'nested'
          node.children = buildTree(value1, {})
        }
        else {
          node.type = 'plain';
          node.value = value1;
        }
      }

      if (key in data2) {
        node.status = 'added';
        if (_.isObject(value2)) {
          node.type = 'nested'
          node.children = buildTree(value1, value2) 
        }
        else {
          node.type = 'plain';
          node.value = value2;
        }
      }
      console.log('Текущая нода если есть один ключ = ', node)
      return node;
    });
    return packTree;
  };
export default buildTree
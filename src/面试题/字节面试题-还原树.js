/**
 * 根据数组[{id: 1}, {id: 2, parent: 1}] 还原树
 */

function createTree(arr) {
  if (!Array.isArray(arr) || !arr.length) {
    return {};
  }

  const result = {};
  const map = {};
  arr.forEach((item) => {
    if (map[item.parent]) {
      map[item.parent].children.push({
        id: item.id,
        children: [],
      });
    } else if (item.hasOwnProperty('parent')) {
      map[item.parent] = {
        id: item.parent,
        children: [{
          id: item.id,
          children: [],
        }],
      };
    } else {
      result.root = {
        id: item.id,
        children: [],
      };
    }
  });

  const queue = [result.root];
  while (queue.length) {
    const curr = queue[0];
    if (map[curr.id]) {
      curr.children = [...map[curr.id].children];
      queue.push(...curr.children);
    }
    queue.shift();
  }

  return result;
}

const testData = [{
  id: 1,
  parent: 0,
}, {
  id: 2,
  parent: 1,
}, {
  id: 3,
  parent: 1,
}, {
  id: 4,
  parent: 1,
}, {
  id: 5,
  parent: 1,
}, {
  id: 6,
  parent: 3,
}, {
  id: 7,
  parent: 3,
}, {
  id: 8,
  parent: 3,
}, {
  id: 9,
  parent: 4,
}, {
  id: 10,
  parent: 2,
}, {
  id: 11,
  parent: 1,
}, {
  id: 0,
}, {
  id: 12,
  parent: 11,
}];

console.log(JSON.stringify(createTree(testData)));

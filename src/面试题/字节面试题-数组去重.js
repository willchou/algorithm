/**
 * 要求，对象类型元素，如果kv一直，认为是同一元素
 * @param {array} baseArr
 * 例：[1, '1', undefined, null, 0, 1, '1', {a: 1}, {a: 1}] => [1, '1', undefinded, null, 0, {a: 1}]
 */
const removeDup = (baseArr) => {
  const isSameObj = (base, curr) => {
    const baseKeys = Object.keys(base);
    const currKeys = Object.keys(curr);
    if (baseKeys.length !== currKeys.length) {
      return false;
    }

    for (let i = 0; i < baseKeys.length; i++) {
      if (base[baseKeys[i]] !== curr[currKeys[i]]) {
        return false;
      }
    }

    return true;
  };

  const isSameArr = (base, curr) => {
    if (base.length !== curr.length) {
      return false;
    }
    base.forEach((item) => {
      if (curr.includes(item)) {
        return false;
      }
    });
    return true;
  };

  const result = [];
  let objTemp = [];
  let arrTemp = [];

  baseArr.forEach((item) => {
    if (Array.isArray(item)) {
      arrTemp.push(item);
    } else if (typeof item === 'object' && item !== undefined && item !== null) {
      objTemp.push(item);
    } else if (!result.includes(item)) {
      result.push(item);
    }
  });

  if (objTemp.length > 1) {
    const temp = [objTemp[1]];
    objTemp.forEach((item) => {
      temp.forEach((elem) => {
        if (!isSameObj(item, elem)) {
          temp.push(item);
        }
      });
    });
    objTemp = temp;
  }

  if (arrTemp.length > 1) {
    const temp = [arrTemp[1]];
    arrTemp.forEach((item) => {
      temp.forEach((elem) => {
        if (!isSameArr(item, elem)) {
          temp.push(item);
        }
      });
    });

    arrTemp = temp;
  }

  return [...result, ...objTemp, ...arrTemp];
};

const testData = [1, 1, '1', undefined, null, { a: 1 }, { a: 1 }, [1], [1]];

console.log(removeDup(testData));

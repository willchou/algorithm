/**
 * 有一组长短不一的信封，大信封可以包裹小信封，问最多可以套多少层
 * 例：[[5,4], [6,4], [6,7], [2,3]] => [[2,3], [5,4], [6,7]] 3个
 */

function maxEnvelopes(envelopes) {
  let res = 0;
  envelopes.sort((x, y) => {
    if (x[0] < y[0]) {
      return -1;
    } else if (x[0] > y[0]) {
      return 1;
    } else if (x[0] === y[0]) {
      if (x[1] > y[1]) {
        return -1;
      } else if (x[1] < y[1]) {
        return 1;
      }
      return 0;
    }
    return 0;
  });

  const dp = envelopes.map(() => {
    return 1;
  });
  for (let i = 0; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  dp.forEach((item) => {
    if (item > res) {
      res = item;
    }
  });

  return res;
}

const arr = [[5, 4], [6, 4], [6, 7], [2, 3]];
console.log(maxEnvelopes(arr));

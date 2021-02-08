/**
 * 输入一个整数数组，找一个和最大的子数组
 * [-3, 1, 3, -1, 2, -4, 2] => [1, 3, -1, 2] 5
 */

function maxSubArray(arr) {
  // const dp = arr.concat();
  const dp = arr.map((item) => {
    return {
      value: item,
      result: [],
    };
  });

  // 核心是找到状态转移方程
  // 子数组最大，只需要判断当前数字加入前一状态集，是否增大此序列
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i] + dp[i - 1].value) {
      dp[i].value = arr[i];
      dp[i].result = [arr[i]];
    } else if (arr[i] < arr[i] + dp[i - 1].value) {
      dp[i].value = arr[i] + dp[i - 1].value;
      dp[i].result.push(...dp[i - 1].result, arr[i]);
    } else {
      dp[i].value = arr[i];
      dp[i].result.push(...dp[i - 1].result, arr[i]);
    }
    // dp[i] = Math.max(arr[i], arr[i] + dp[i - 1]);
  }

  let res = {
    value: Number.NEGATIVE_INFINITY,
    result: [],
  };
  dp.forEach((item) => {
    if (item.value > res.value) {
      res = item;
    }
  });

  return res;
}

const arr = [-3, 1, 3, -1, 2, -4, 2];
console.log(maxSubArray(arr));

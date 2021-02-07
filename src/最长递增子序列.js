/**
 * LIS(longest increasing subsequence)
 * 给定一个数组，找出数组中最长递增子序列长度
 * 子序列表示元素在数组中可以不连续
 * 例：[19,9,2,5,3,7,101,18] => [2,3,5,101] 长度4
 *
 * 动态规划，找状态转移方程
 */
function lengthOfLIS(arr) {
  let res = 0;
  const dp = arr.map(() => {
    return 1;
  });

  for (let i = 0; i < dp.length; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[i] > arr[j]) {
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

const arr = [19, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(arr));

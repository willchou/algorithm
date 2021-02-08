/**
 * 输入一个字符串s，找出s中最长回文子序列长度
 * s = 'aecda' => 3 'aca'
 */
function longestPalindromeSubseq(s) {
  const len = s.length;
  const dp = Array(len).fill(0).map(() => {
    return 1;
  });

  // 压缩dp table的核心是确定状态转移的规律
  // dp[i][j]依赖的是dp[i + 1][j - 1], dp[i][j - 1], dp[i + 1][j] 相邻的3个元素
  // 压缩数组，就是去掉外层循环
  // 去掉i后，dp[j] 有3层含义，默认值是对角线初始化的值，dp[j] => dp[i + 1][j], dp[j - 1] => dp[i][j - 1]
  // 同时为了拿到dp[i+1][j-1]，需要在最外层循环记录上次循环结果pre

  for (let i = len - 2; i >= 0; i--) {
    let pre = 0;
    for (let j = i + 1; j < len; j++) {
      // 对应二维数组对角线的值，即上次循环终点
      const temp = dp[j];
      console.log(temp, i, j, dp);
      if (s[i] === s[j]) {
        // pre对应上次循环最大值, 即dp[i+1][j-1]
        dp[j] = pre + 2;
      } else {
        // dp[j - 1] => dp[i][j - 1]
        // dp[j] => dp[i + 1][j]
        dp[j] = Math.max(dp[j - 1], dp[j]);
      }
      pre = temp;
    }
  }

  return dp[len - 1];
}

const s = 'adccda';

console.log(longestPalindromeSubseq(s));

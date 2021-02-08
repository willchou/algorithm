/**
 * 输入一个字符串s，找出s中最长回文子序列长度
 * s = 'aecda' => 3 'aca'
 */
function longestPalindromeSubseq(s) {
  const len = s.length;
  const dp = Array(len).fill(0).map((v, i) => {
    const arr = Array(len).fill(0);
    arr[i] = 1;
    return arr;
  });

  for (let i = len - 2; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }

  return dp[0][len - 1];
}

const s = 'adccecda';

console.log(longestPalindromeSubseq(s));

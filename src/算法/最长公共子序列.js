/**
 * 求两个字符串最长公共子序列
 * str1 = 'abcde' str2 = 'aceb'
 * ace
 */
function longestCommonSubsequence(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  // 初始化dp table, width len1, height len2
  // dp[i][j] 表示str1[i - 1] str2[j - 1]的最长公共子序列
  // base case 均为0
  const dp = Array(len1 + 1).fill(0).map(() => {
    return Array(len2 + 1).fill(0);
  });

  // str1[i - 1] === str2[j - 1] 此字符一定存在于lcs中
  // str1[i - 1] !== str2[j - 1] 至少有一个字符不在lcs中，取最大就好；两个都不在时，长度是最小的

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[len1][len2];
}

const str1 = 'abcde';
const str2 = 'aceb';

console.log(longestCommonSubsequence(str1, str2));

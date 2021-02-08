/**
 * 可以对一个字符串进行三种操作：插入一个字符，删除一个字符，替换一个字符
 * 现有s1, s2，计算将s1转换成s2最少需要多少次操作
 * s1 = 'intention'
 * s2 = 'execution'
 * 5步
 *
 * 1. delete t, intention -> inention
 * 2. replace i with e, inention -> enention
 * 3. replace n with x, enention -> exention
 * 4. relpace n with c, exention -> exection
 * 5. insert u, exection -> execution
 */

function minDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  // dp[i][j] 代表s1[0...i - 1], s2[0...j - 2] 需要编辑的步骤
  const dp = Array(m + 1).fill(0).map(() => {
    return Array(n + 1).fill(0);
  });

  // base case 初始化
  for (let i = 1; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = min(
          dp[i][j - 1] + 1, // 插入 在s1[i]中 插入 s2[j]，那么s2[j]被匹配了，前移j，继续和i对比
          dp[i - 1][j] + 1, // 删除 s1[i], 前移i 继续和j对比
          dp[i - 1][j - 1] + 1, // 替换 直接把s1[i]替换为s2[j]，同时前移i,j 继续对比
        );
      }
    }
  }

  console.log(dp[m][n]);
  // printStep(dp, s1, s2);
}


function min(a, b, c) {
  return Math.min(a, Math.min(b, c));
}


const s1 = 'intention';
const s2 = 'execution';

minDistance(s1, s2);

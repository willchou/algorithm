/**
 * 可以对一个字符串进行三种操作：插入一个字符，删除一个字符，替换一个字符
 * 现有s1, s2，计算将s1转换成s2最少需要多少次操作
 * s1 = 'intention'
 * s2 = 'execution'
 * 5步
 *
 * 1. delete t, intention -> inention
 * 2. replace i to e, inention -> enention
 * 3. replace n to x, enention -> exention
 * 4. relpace n to c, exention -> exection
 * 5. insert u, exection -> execution
 */
function minDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  // 备忘录，记录dp子集
  const memo = {};

  function dp(i, j) {
    if (memo[`${i},${j}`]) {
      return memo[`${i},${j}`];
    }
    // base case 使用参照系 +1处理，先走完的，在参照系做删除操作
    if (i === -1) return j + 1;
    if (j === -1) return i + 1;
    if (s1[i] === s2[j]) {
      memo[`${i},${j}`] = dp(i - 1, j - 1);
    } else {
      // dp 依赖前置状态
      // 一共三种，插入、删除、替换
      memo[`${i},${j}`] = min(
        dp(i, j - 1) + 1, // 插入 在s1[i]中 插入 s2[j]，那么s2[j]被匹配了，前移j，继续和i对比
        dp(i - 1, j) + 1, // 删除 s1[i], 前移i 继续和j对比
        dp(i - 1, j - 1) + 1, // 替换 直接把s1[i]替换为s2[j]，同时前移i,j 继续对比
      );
    }
    return memo[`${i},${j}`];
  }

  return dp(m - 1, n - 1);
}


function min(a, b, c) {
  return Math.min(a, Math.min(b, c));
}

const s1 = 'intention';
const s2 = 'execution';

console.log(minDistance(s1, s2));

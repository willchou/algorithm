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

class Node {
  constructor(val, choice) {
    this.val = val;
    /**
     * 枚举类型
     * 1. insert
     * 2. delete
     * 3. replace
     * 0. skip
     */
    this.choice = choice;
  }
}

function minDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  // dp[i][j] 代表s1[0...i - 1], s2[0...j - 2] 需要编辑的步骤
  const dp = Array(m + 1).fill(0).map(() => {
    return Array(n + 1).fill(0);
  });

  // base case 初始化
  for (let i = 1; i <= m; i++) {
    dp[i][0] = new Node(i, 2);
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = new Node(j, 1);
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = new Node(dp[i - 1][j - 1].val, 0);
      } else {
        dp[i][j] = minNode(
          dp[i][j - 1], // 插入 在s1[i]中 插入 s2[j]，那么s2[j]被匹配了，前移j，继续和i对比
          dp[i - 1][j], // 删除 s1[i], 前移i 继续和j对比
          dp[i - 1][j - 1], // 替换 直接把s1[i]替换为s2[j]，同时前移i,j 继续对比
        );
        dp[i][j].val = dp[i][j].val + 1;
      }
    }
  }

  console.log(dp[m][n].val);
  printStep(dp, s1, s2);
}


function minNode(a, b, c) {
  const res = new Node(a.val, 1);
  if (res.val > b.val) {
    res.choice = 2;
    res.val = b.val;
  }
  if (res.val > c.val) {
    res.choice = 3;
    res.val = c.val;
  }
  return res;
}

function printStep(dp, s1, s2) {
  const row = dp.length;
  const col = dp[0].length;
  let i = row - 1;
  let j = col - 1;
  const temp = s1.split('');
  console.log('change s1 =', s1, 'to s2 =', s2);
  while (i !== 0 && j !== 0) {
    const c1 = s1[i - 1];
    const c2 = s2[j - 1];
    const { choice } = dp[i][j];
    let msg = '';
    switch (choice) {
      case 0:
        msg = 'skip ' + c1;
        i--;
        j--;
        break;
      case 1:
        msg = 'insert ' + c2;
        temp.splice(i, 0, c2);
        j--;
        break;
      case 2:
        msg = 'delete ' + c1;
        temp.splice(i - 1, 1);
        i--;
        break;
      case 3:
        msg = 'replace ' + c1 + ' with ' + c2;
        temp[i - 1] = c2;
        i--;
        j--;
        break;
      default:
        break;
    }

    console.log('s1[', i + 1, ']: ', msg, '=>', temp.join(''));
  }

  while (i > 0) {
    console.log('s1[', i, ']: delete ', s1[i - 1]);
    i--;
  }

  while (j > 0) {
    console.log('s1[0]: insert ', s2[j - 1]);
    j--;
  }
}

const s1 = 'bibntexntion';
const s2 = 'execution';

minDistance(s1, s2);

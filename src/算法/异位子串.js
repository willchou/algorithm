/**
 * 找到字符串中所有异位词
 * 例：s='cbaebabacd' t='abc' 返回 [0, 6]
 */
function findSubst(s, t) {
  let left = 0;
  let right = 0;
  let valid = 0;
  const result = [];
  const need = {};
  const window = {};

  for (const c of t) {
    need[c] = need[c] ? need[c] + 1 : 1;
  }

  while (right < s.length) {
    const inChar = s[right];
    right++;
    if (need[inChar]) {
      window[inChar] = window[inChar] ? window[inChar] + 1 : 1;
      if (window[inChar] === need[inChar]) {
        valid++;
      }
    }

    while (right - left >= t.length) {
      if (valid === t.length) {
        result.push(left);
      }
      const outChar = s[left];
      left++;
      if (need[outChar]) {
        if (window[outChar] === need[outChar]) {
          valid--;
        }
        window[outChar]--;
      }
    }
  }
  return result;
}

const s = 'cbaebabacd';
const t = 'abc';
console.log(findSubst(s, t));

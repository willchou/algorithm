/**
 * 滑动窗口, 最小覆盖子串
 * 根据t，找出s中包含t的最小窗口
 * s和t均为字符串
 * 例：
 *  s = 'adbecfebanc'
 *  t = 'abc'
 * 输出 'banc'
 */
function minWindow(s, t) {
  const needs = {};
  const window = {};

  for (const i of t) {
    needs[i] = needs[i] ? needs[i]++ : 1;
  }

  let start = 0;
  let len = Infinity;
  let left = 0;
  let right = 0;
  let valid = 0;
  while (right < s.length) {
    const char = s[right];
    right++;
    if (needs[char]) {
      window[char] = window[char] ? window[char] + 1 : 1;
      if (window[char] === needs[char]) {
        valid++;
      }
    }

    while (valid === Object.keys(needs).length) {
      if (right - left < len) {
        len = right - left;
        start = left;
      }

      const out = s[left];
      left++;

      if (needs[out]) {
        if (window[out] === needs[out]) {
          valid--;
        }
        window[out]--;
      }
    }
  }

  return len === Infinity ? '' : s.substr(start, len);
}

const s = 'adbecfebanc';
const t = 'abc';

console.log(minWindow(s, t));

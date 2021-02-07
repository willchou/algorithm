/**
 * 输入s = 'aabaab' 输出2 因为最长无重复子串为'ab' or 'ba'
 */
function uniqSubstr(s) {
  let left = 0;
  let right = 0;
  const window = {};
  let res = 0;
  while (right < s.length) {
    const inChar = s[right];
    right++;
    window[inChar] = window[inChar] ? window[inChar] + 1 : 1;
    while (window[inChar] > 1) {
      const outChar = s[left];
      left++;
      window[outChar]--;
    }

    res = Math.max(res, right - left);
  }
  return res;
}

const s = 'aabaab';

console.log(uniqSubstr(s));

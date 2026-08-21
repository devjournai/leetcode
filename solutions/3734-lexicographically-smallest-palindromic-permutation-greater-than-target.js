/**
 * Lexicographically Smallest Palindromic Permutation Greater Than Target
 * Intuition: A palindromic permutation exists only if at most one character has an odd count. The first half determines the palindrome, so we try to keep target's first half and bump the earliest possible letter.
 * Approach: 1. Count frequencies; return "" if more than one odd count. 2. Reserve the odd center if n is odd. 3. Match target's first half while pairs remain. 4. If the mirrored string already exceeds target, return it. 5. Otherwise backtrack and raise the first half to the next available letter, then fill remaining pairs greedily.
 * Dry Run: s = "baba", target = "abba". Frequencies a:2,b:2. Matching "ab" uses both pairs and yields "abba" which is not greater, so bump to "ba" + reverse -> "baab".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var lexPalindromicPermutation = function (s, target) {
  const n = target.length;
  const cnt = Array(26).fill(0);
  for (const ch of s) {
    cnt[ch.charCodeAt(0) - 97]++;
  }
  if (cnt.reduce((odd, c) => odd + (c % 2), 0) > 1) {
    return "";
  }

  let center = -1;
  if (n % 2) {
    center = cnt.findIndex((c) => c % 2);
    cnt[center]--;
  }

  const halfLen = Math.floor(n / 2);
  const result = [];
  let matched = true;
  for (let i = 0; i < halfLen; i++) {
    const c = target.charCodeAt(i) - 97;
    cnt[c] -= 2;
    result.push(target[i]);
    if (cnt[c] < 0) {
      matched = false;
      break;
    }
  }

  const build = (arr) => {
    let ret = arr.join("");
    if (n % 2) {
      ret += String.fromCharCode(97 + center);
    }
    ret += arr.slice().reverse().join("");
    return ret;
  };

  if (matched) {
    const ret = build(result);
    if (ret > target) {
      return ret;
    }
  }

  while (result.length) {
    const c = result.pop().charCodeAt(0) - 97;
    cnt[c] += 2;
    for (let i = c + 1; i < 26; i++) {
      if (!cnt[i]) {
        continue;
      }
      cnt[i] -= 2;
      result.push(String.fromCharCode(97 + i));
      for (let j = 0; j < 26; j++) {
        while (cnt[j] >= 2) {
          cnt[j] -= 2;
          result.push(String.fromCharCode(97 + j));
        }
      }
      return build(result);
    }
  }
  return "";
};

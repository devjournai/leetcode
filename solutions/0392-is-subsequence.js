/**
 * Is Subsequence
 * Intuition: `s` is a subsequence of `t` if we can walk `t` once and match every character of `s` in order via `sPointerPosition`.
 * Approach: 1. If `s` is longer than `t`, return false. 2. Two pointers: when `s[sPointerPosition]===t[tCurrentPosition]`, advance `s`. Always advance `t`. 3. Return whether `sPointerPosition` reached `s.length`.
 * Dry Run: s = "abc", t = "ahbgdc".
 *   - a matches a; b matches b; c matches c. s pointer = 3. Return true.
 * Time Complexity: O(t.length)
 * Space Complexity: O(1)
 */
var isSubsequence = function (s, t) {
  const sLengthValue = s.length;
  const tLengthValue = t.length;

  if (sLengthValue > tLengthValue) {
    return false;
  }

  let sPointerPosition = 0;
  let tCurrentPosition = 0;

  while (sPointerPosition < sLengthValue && tCurrentPosition < tLengthValue) {
    if (s[sPointerPosition] === t[tCurrentPosition]) {
      sPointerPosition++;
    }
    tCurrentPosition++;
  }

  return sPointerPosition === sLengthValue;
};

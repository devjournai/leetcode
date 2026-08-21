/**
 * Longest Common Prefix After at Most One Removal
 * Intuition: `t` must be a prefix of `s` after deleting at most one character from `s`. Walk both strings and skip one mismatch in `s`.
 * Approach: 1. Two pointers `sIndex`, `tIndex`, and `canSkip = true`. 2. Equal characters: advance both. 3. Mismatch with skip left: advance only `sIndex` and consume the skip. 4. Second mismatch: return `tIndex`. 5. If we finish, `tIndex` is the prefix length.
 * Dry Run: s = "abecd", t = "aecd". Match `a`, skip `b`, then `ecd` matches → 4. s = "abc", t = "axc" mismatches twice → 1.
 * Time Complexity: O(|s| + |t|)
 * Space Complexity: O(1)
 */
var longestCommonPrefix = function (s, t) {
  let sIndex = 0;
  let tIndex = 0;
  let canSkip = true;

  while (sIndex < s.length && tIndex < t.length) {
    if (s[sIndex] === t[tIndex]) {
      sIndex++;
      tIndex++;
    } else if (canSkip) {
      sIndex++;
      canSkip = false;
    } else {
      return tIndex;
    }
  }

  return tIndex;
};

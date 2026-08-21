/**
 * Subsequence After One Replacement
 * Intuition: The problem is equivalent to asking whether we can greedily match s as a subsequence of t while allowing at most one character in s to mismatch, since that character can be replaced with any letter.
 * Approach: The problem is equivalent to asking whether we can greedily match s as a subsequence of t while allowing at most one character in s to mismatch, since that character can be replaced with any letter. We scan s with two pointers i_0 and i_1, and scan t with pointer j: - i_0 is the current position in s when matching without using the replacement. - i_1 is the current position in s when matching with at most one replacement available.
 * Dry Run: Input: s = "cat", t = "chat". Output: true.
 * Time Complexity: O(|s|+|t|)
 * Space Complexity: O(1)
 */
var canMakeSubsequence = function (s, t) {
  const m = s.length,
    n = t.length;
  let i0 = 0,
    i1 = 0,
    j = 0;

  while (i1 < m && j < n) {
    if (s[i1] === t[j]) {
      i1++;
    }

    i1 = Math.max(i1, i0 + 1);

    if (s[i0] === t[j]) {
      i0++;
    }

    j++;
  }

  return i1 === m;
};

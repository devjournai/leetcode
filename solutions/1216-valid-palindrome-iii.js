/**
 * Valid Palindrome Iii
 * Intuition: k deletions suffice iff n minus the longest palindromic subsequence is ≤ k.
 * Approach: 1. DP lps[i][j]: 1 on diagonal; if s[i]==s[j] then 2+inner else max of dropping a side. 2. needed = n - lps[0][n-1]. 3. Return needed ≤ k.
 * Dry Run: s="abcdeca", k=2. LPS length 5 ("aceca"); deletions 2 → true.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var isValidPalindrome = function (s, k) {
  const stringLength = s.length;

  const dpTable = Array(stringLength)
    .fill(0)
    .map(() => Array(stringLength).fill(0));

  for (
    let singleCharIndex = 0;
    singleCharIndex < stringLength;
    ++singleCharIndex
  ) {
    dpTable[singleCharIndex][singleCharIndex] = 1;
  }

  for (
    let currentSubLength = 2;
    currentSubLength <= stringLength;
    ++currentSubLength
  ) {
    for (
      let leftBoundary = 0;
      leftBoundary <= stringLength - currentSubLength;
      ++leftBoundary
    ) {
      const rightBoundary = leftBoundary + currentSubLength - 1;

      if (s[leftBoundary] === s[rightBoundary]) {
        dpTable[leftBoundary][rightBoundary] =
          2 +
          (currentSubLength === 2
            ? 0
            : dpTable[leftBoundary + 1][rightBoundary - 1]);
      } else {
        dpTable[leftBoundary][rightBoundary] = Math.max(
          dpTable[leftBoundary + 1][rightBoundary],
          dpTable[leftBoundary][rightBoundary - 1]
        );
      }
    }
  }

  const maxPalindromeSubsequence = dpTable[0][stringLength - 1];
  const neededDeletions = stringLength - maxPalindromeSubsequence;

  return neededDeletions <= k;
};

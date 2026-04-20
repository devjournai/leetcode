/**
 * Valid Palindrome Iii
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
          dpTable[leftBoundary][rightBoundary - 1],
        );
      }
    }
  }

  const maxPalindromeSubsequence = dpTable[0][stringLength - 1];
  const neededDeletions = stringLength - maxPalindromeSubsequence;

  return neededDeletions <= k;
};

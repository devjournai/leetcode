/**
 * Longest Arithmetic Subsequence Of Given Difference
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var longestSubsequence = function (arr, difference) {
  const longestSequenceMap = new Map();
  let maxOverallLength = 0;

  for (const currentElement of arr) {
    const previousElementCandidate = currentElement - difference;
    const lengthForPrevious =
      longestSequenceMap.get(previousElementCandidate) || 0;
    const computedCurrentLength = lengthForPrevious + 1;
    longestSequenceMap.set(currentElement, computedCurrentLength);
    maxOverallLength = Math.max(maxOverallLength, computedCurrentLength);
  }

  return maxOverallLength;
};

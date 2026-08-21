/**
 * Longest Arithmetic Subsequence Of Given Difference
 * Intuition: The best chain ending at x is 1 plus the best chain ending at x-difference, which we store as we scan left to right.
 * Approach: 1. Map value → longest length ending there. 2. For each x set map[x] = map[x-diff]+1 (or 1). 3. Track the max.
 * Dry Run: arr=[1,2,3,4], difference=1. Lengths 1,2,3,4 → 4.
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

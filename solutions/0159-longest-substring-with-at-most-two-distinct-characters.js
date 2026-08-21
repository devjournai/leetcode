/**
 * Longest Substring With At Most Two Distinct Characters
 * Intuition: A sliding window is valid while the map of character frequencies has size at most 2. Grow the right end, shrink the left when a third distinct character appears.
 * Approach: 1. `charFrequencies` map, `startOfWindow` and `endOfWindow` at 0, `longestSubstringValue` 0. 2. Increment frequency of `s[endOfWindow]`. 3. While `charFrequencies.size > 2`, decrement `s[startOfWindow]` and delete the key if it hits 0, then `startOfWindow++`. 4. Update longest with `endOfWindow - startOfWindow + 1`, then `endOfWindow++`. 5. Return `longestSubstringValue`.
 * Dry Run: s = "eceba"
 * Window ece (size 2, len 3) then eceb needs shrink to ceb then eb; then ba. Best length 3
 * Result: 3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  const charFrequencies = new Map();
  let longestSubstringValue = 0;
  let startOfWindow = 0;
  let endOfWindow = 0;

  while (endOfWindow < s.length) {
    const currentCharAtEnd = s[endOfWindow];
    charFrequencies.set(
      currentCharAtEnd,
      (charFrequencies.get(currentCharAtEnd) || 0) + 1
    );

    while (charFrequencies.size > 2) {
      const currentCharAtStart = s[startOfWindow];
      charFrequencies.set(
        currentCharAtStart,
        charFrequencies.get(currentCharAtStart) - 1
      );
      if (charFrequencies.get(currentCharAtStart) === 0) {
        charFrequencies.delete(currentCharAtStart);
      }
      startOfWindow++;
    }

    longestSubstringValue = Math.max(
      longestSubstringValue,
      endOfWindow - startOfWindow + 1
    );
    endOfWindow++;
  }

  return longestSubstringValue;
};

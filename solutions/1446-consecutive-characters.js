/**
 * Consecutive Characters
 * Intuition: Power is the longest run of the same character. Reset the run length whenever the character changes.
 * Approach: 1. If empty, return 0. 2. Scan indices; if char differs from previous, set length 1, else increment. 3. Track the max run. 4. Return highestPower.
 * Dry Run: s = "leetcode"
 *   - "l" 1, "ee" 2, "t" 1, "c" 1, "o" 1, "d" 1, "e" 1
 *   - max = 2
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxPower = function (s) {
  const stringLength = s.length;
  if (stringLength === 0) {
    return 0;
  }

  let highestPower = 1;
  let currentConsecutiveLength = 0;

  for (let iteratorIndex = 0; iteratorIndex < stringLength; iteratorIndex++) {
    const currentChar = s[iteratorIndex];
    const previousChar = iteratorIndex > 0 ? s[iteratorIndex - 1] : null;

    if (iteratorIndex === 0 || currentChar !== previousChar) {
      currentConsecutiveLength = 1;
    } else {
      currentConsecutiveLength++;
    }

    highestPower = Math.max(highestPower, currentConsecutiveLength);
  }

  return highestPower;
};

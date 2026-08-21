/**
 * Minimum Suffix Flips
 * Intuition: A suffix flip toggles everything from i onward. The flip count equals how many times the target bit changes from the previous effective bit (start '0').
 * Approach: 1. effective='0', count=0. 2. On mismatch increment and set effective to that char.
 * Dry Run: target = "10111".
 *   - Changes 0→1, 1→0, 0→1 → 3 flips.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minFlips = function (target) {
  let currentEffectiveBit = "0";
  let operationCount = 0;

  for (let charIndex = 0; charIndex < target.length; charIndex++) {
    const currentIterationChar = target[charIndex];
    if (currentIterationChar !== currentEffectiveBit) {
      operationCount++;
      currentEffectiveBit = currentIterationChar;
    }
  }

  return operationCount;
};

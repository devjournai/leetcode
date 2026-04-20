/**
 * Minimum Suffix Flips
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

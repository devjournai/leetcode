/**
 * Destroy Sequential Targets
 * Intuition: Targets that can be destroyed by the same seed value must have the same remainder when divided by `space`. We need to count the occurrences of each remainder value and find the maximum count. Then, among all numbers that belong to a remainder group with this maximum count, we select the smallest number.
 * Approach: 1. Iterate through `nums` to build a frequency map of `num % space` values, simultaneously tracking the highest frequency encountered. 2. Iterate through `nums` again, comparing each `num`'s remainder frequency with the maximum frequency. If they match, `num` is a candidate; keep track of the minimum such `num`.
 * Dry Run: nums = [1, 2, 3, 4, 5], space = 2
 *   Initialization: remainderFrequencies = Map{}, maxOccurrences = 0, minimumSeed = Infinity
 *   First Pass (count frequencies):
 *     num = 1: remainder = 1 % 2 = 1. remainderFrequencies.set(1, 1). maxOccurrences = max(0, 1) = 1.
 *     num = 2: remainder = 2 % 2 = 0. remainderFrequencies.set(0, 1). maxOccurrences = max(1, 1) = 1.
 *     num = 3: remainder = 3 % 2 = 1. remainderFrequencies.set(1, 2). maxOccurrences = max(1, 2) = 2.
 *     num = 4: remainder = 4 % 2 = 0. remainderFrequencies.set(0, 2). maxOccurrences = max(2, 2) = 2.
 *     num = 5: remainder = 5 % 2 = 1. remainderFrequencies.set(1, 3). maxOccurrences = max(2, 3) = 3.
 *   End of First Pass: remainderFrequencies = {0: 2, 1: 3}, maxOccurrences = 3
 *   Second Pass (find minimum seed):
 *     num = 1: remainder = 1 % 2 = 1. remainderFrequencies.get(1) = 3. Since 3 === maxOccurrences, minimumSeed = min(Infinity, 1) = 1.
 *     num = 2: remainder = 2 % 2 = 0. remainderFrequencies.get(0) = 2. Since 2 !== maxOccurrences, skip.
 *     num = 3: remainder = 3 % 2 = 1. remainderFrequencies.get(1) = 3. Since 3 === maxOccurrences, minimumSeed = min(1, 3) = 1.
 *     num = 4: remainder = 4 % 2 = 0. remainderFrequencies.get(0) = 2. Since 2 !== maxOccurrences, skip.
 *     num = 5: remainder = 5 % 2 = 1. remainderFrequencies.get(1) = 3. Since 3 === maxOccurrences, minimumSeed = min(1, 5) = 1.
 *   Return minimumSeed (1).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var destroyTargets = function (nums, space) {
  const remainderCounts = new Map();
  let maximumTargetCount = 0;

  for (const currentNumber of nums) {
    const calculatedRemainder = currentNumber % space;
    const existingCount = remainderCounts.get(calculatedRemainder) || 0;
    const newCount = existingCount + 1;
    remainderCounts.set(calculatedRemainder, newCount);
    maximumTargetCount = Math.max(maximumTargetCount, newCount);
  }

  let minimumDestroyer = Infinity;
  for (const targetNumber of nums) {
    const targetRemainder = targetNumber % space;
    const targetGroupCount = remainderCounts.get(targetRemainder);
    if (targetGroupCount === maximumTargetCount) {
      minimumDestroyer = Math.min(minimumDestroyer, targetNumber);
    }
  }

  return minimumDestroyer;
};

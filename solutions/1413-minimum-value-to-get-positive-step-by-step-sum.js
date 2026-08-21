/**
 * Minimum Value To Get Positive Step By Step Sum
 * Intuition: The start value must keep every prefix >= 1, so it is 1 minus the most negative prefix (or 1 if all prefixes are non-negative).
 * Approach: 1. Scan nums tracking the running sum and its minimum. 2. Return max(1, 1 - minPrefix).
 * Dry Run: nums = [-3,2,-3,4,2].
 *   - Prefixes: -3, -1, -4, 0, 2. Min = -4. Start = 1 - (-4) = 5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minStartValue = function (nums) {
  let minimumAggregateSum = 0;
  let runningValueAccumulator = 0;

  for (const numberElement of nums) {
    runningValueAccumulator += numberElement;
    minimumAggregateSum = Math.min(
      minimumAggregateSum,
      runningValueAccumulator
    );
  }

  return Math.max(1, 1 - minimumAggregateSum);
};

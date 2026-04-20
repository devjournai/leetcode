/**
 * Minimum Value To Get Positive Step By Step Sum
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
      runningValueAccumulator,
    );
  }

  return Math.max(1, 1 - minimumAggregateSum);
};

/**
 * Smallest Range II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var smallestRangeII = function (nums, k) {
  nums.sort((valA, valB) => valA - valB);

  const arraySize = nums.length;
  if (arraySize === 1) {
    return 0;
  }

  let minimumScore = nums[arraySize - 1] - nums[0];

  for (let loopCounter = 0; loopCounter < arraySize - 1; loopCounter++) {
    const firstPartHighest = nums[loopCounter] + k;
    const originalLastElementDecremented = nums[arraySize - 1] - k;
    const currentMaximumRangeValue = Math.max(
      firstPartHighest,
      originalLastElementDecremented,
    );

    const originalFirstElementIncremented = nums[0] + k;
    const secondPartLowest = nums[loopCounter + 1] - k;
    const currentMinimumRangeValue = Math.min(
      originalFirstElementIncremented,
      secondPartLowest,
    );

    const currentRangeDifference =
      currentMaximumRangeValue - currentMinimumRangeValue;
    minimumScore = Math.min(minimumScore, currentRangeDifference);
  }

  return minimumScore;
};

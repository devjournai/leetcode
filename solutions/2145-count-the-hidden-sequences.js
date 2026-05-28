/**
 * Count The Hidden Sequences
 * Intuition: The values of a hidden sequence are determined by its first element and the cumulative sum of differences. By fixing the first element, say `h[0]`, all other elements `h[i]` can be expressed as `h[0] + current_offset[i]`, where `current_offset[i]` is the sum of differences up to `i-1`. To satisfy the `[lower, upper]` range constraint for all `h[i]`, `h[0]` must be chosen such that `lower <= h[0] + min_overall_offset` and `h[0] + max_overall_offset <= upper`. This defines an inclusive range for `h[0]`, and the number of integers in this range is the answer.
 * Approach: 1. Initialize `currentOffsetSum` to 0, `minimumPossibleOffset` to 0, and `maximumPossibleOffset` to 0. These track the running sum of differences and its overall minimum/maximum relative to `h[0]`. 2. Iterate through the `differences` array. In each step, update `currentOffsetSum` by adding the current difference. Then, update `minimumPossibleOffset` to be the minimum of its current value and `currentOffsetSum`. Similarly, update `maximumPossibleOffset` to be the maximum of its current value and `currentOffsetSum`. 3. After the loop, calculate the effective lower bound for `h[0]` as `lower - minimumPossibleOffset` and the effective upper bound for `h[0]` as `upper - maximumPossibleOffset`. 4. The number of valid starting values for `h[0]` is the difference between these effective bounds plus one, if the upper bound is greater than or equal to the lower bound; otherwise, it's 0.
 * Dry Run: differences = [1, -3, 4], lower = 1, upper = 6
 * Initial: currentOffsetSum = 0, minimumPossibleOffset = 0, maximumPossibleOffset = 0
 *
 * Loop 1 (diff = 1):
 *   currentOffsetSum = 0 + 1 = 1
 *   minimumPossibleOffset = Math.min(0, 1) = 0
 *   maximumPossibleOffset = Math.max(0, 1) = 1
 *
 * Loop 2 (diff = -3):
 *   currentOffsetSum = 1 + (-3) = -2
 *   minimumPossibleOffset = Math.min(0, -2) = -2
 *   maximumPossibleOffset = Math.max(1, -2) = 1
 *
 * Loop 3 (diff = 4):
 *   currentOffsetSum = -2 + 4 = 2
 *   minimumPossibleOffset = Math.min(-2, 2) = -2
 *   maximumPossibleOffset = Math.max(1, 2) = 2
 *
 * End of loop.
 *
 * Calculate bounds for h[0]:
 *   effectiveStartLower = lower - minimumPossibleOffset = 1 - (-2) = 3
 *   effectiveStartUpper = upper - maximumPossibleOffset = 6 - 2 = 4
 *
 * Calculate count:
 *   possibleStartValuesCount = effectiveStartUpper - effectiveStartLower + 1 = 4 - 3 + 1 = 2
 *
 * Result: 2
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numberOfArrays = function (differencesArray, lowerBound, upperBound) {
  let currentRelativeSum = 0;
  let overallMinimumRelative = 0;
  let overallMaximumRelative = 0;

  for (
    let currentIndex = 0;
    currentIndex < differencesArray.length;
    currentIndex++
  ) {
    currentRelativeSum += differencesArray[currentIndex];
    overallMinimumRelative = Math.min(
      overallMinimumRelative,
      currentRelativeSum,
    );
    overallMaximumRelative = Math.max(
      overallMaximumRelative,
      currentRelativeSum,
    );
  }

  const startValueLowerLimit = lowerBound - overallMinimumRelative;
  const startValueUpperLimit = upperBound - overallMaximumRelative;

  const totalValidCount = startValueUpperLimit - startValueLowerLimit + 1;

  return totalValidCount > 0 ? totalValidCount : 0;
};

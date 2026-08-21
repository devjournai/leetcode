/**
 * Missing Ranges
 * Intuition: Gaps between consecutive bounds (including `lower - 1` before the first number and `upper + 1` after the last) are the missing inclusive intervals.
 * Approach: 1. `priorNumber = lower - 1`. 2. For `arrayPointer` from 0 through `nums.length`, take `currentBoundaryValue` as `nums[arrayPointer]` or `upper + 1` when past the array. 3. If `currentBoundaryValue - priorNumber > 1`, push `[priorNumber + 1, currentBoundaryValue - 1]`. 4. Set `priorNumber` to the current boundary and continue. 5. Return `gatheredRanges`.
 * Dry Run: nums = [0,1,3,50,75], lower = 0, upper = 99
 * Gaps vs sentinels: [2,2], [4,49], [51,74], [76,99]
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var findMissingRanges = function (nums, lower, upper) {
  const gatheredRanges = [];
  let priorNumber = lower - 1;
  let arrayPointer = 0;

  while (arrayPointer <= nums.length) {
    let currentBoundaryValue;
    if (arrayPointer < nums.length) {
      currentBoundaryValue = nums[arrayPointer];
    } else {
      currentBoundaryValue = upper + 1;
    }

    if (currentBoundaryValue - priorNumber > 1) {
      let startOfMissingRange = priorNumber + 1;
      let endOfMissingRange = currentBoundaryValue - 1;
      gatheredRanges.push([startOfMissingRange, endOfMissingRange]);
    }

    priorNumber = currentBoundaryValue;
    arrayPointer++;
  }

  return gatheredRanges;
};

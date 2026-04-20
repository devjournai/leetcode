/**
 * Missing Ranges
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

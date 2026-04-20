/**
 * Smallest Range I
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var smallestRangeI = function (nums, k) {
  let currentMinimum = nums[0];
  let currentMaximum = nums[0];
  const arrayLength = nums.length;

  for (let indexValue = 1; indexValue < arrayLength; indexValue++) {
    if (nums[indexValue] < currentMinimum) {
      currentMinimum = nums[indexValue];
    }
    if (nums[indexValue] > currentMaximum) {
      currentMaximum = nums[indexValue];
    }
  }

  const potentialMinModified = currentMinimum + k;
  const potentialMaxModified = currentMaximum - k;

  if (potentialMaxModified <= potentialMinModified) {
    return 0;
  } else {
    const calculatedDifference = potentialMaxModified - potentialMinModified;
    return calculatedDifference;
  }
};

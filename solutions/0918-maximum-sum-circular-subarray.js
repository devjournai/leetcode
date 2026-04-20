/**
 * Maximum Sum Circular Subarray
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxSubarraySumCircular = function (nums) {
  let listLength = nums.length;

  let currentMaximumRunningSum = nums[0];
  let overallLargestSum = nums[0];
  let currentMinimumRunningSum = nums[0];
  let overallSmallestSum = nums[0];
  let totalArrayElementsSum = nums[0];

  for (let elementIndex = 1; elementIndex < listLength; elementIndex++) {
    let currentValue = nums[elementIndex];

    currentMaximumRunningSum = Math.max(
      currentValue,
      currentMaximumRunningSum + currentValue,
    );
    overallLargestSum = Math.max(overallLargestSum, currentMaximumRunningSum);

    currentMinimumRunningSum = Math.min(
      currentValue,
      currentMinimumRunningSum + currentValue,
    );
    overallSmallestSum = Math.min(overallSmallestSum, currentMinimumRunningSum);

    totalArrayElementsSum += currentValue;
  }

  return overallLargestSum > 0
    ? Math.max(overallLargestSum, totalArrayElementsSum - overallSmallestSum)
    : overallLargestSum;
};

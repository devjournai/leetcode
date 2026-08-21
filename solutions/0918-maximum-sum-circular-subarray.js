/**
 * Maximum Sum Circular Subarray
 * Intuition: A circular max is either a normal Kadane max or total minus the min subarray (the wrap). If the Kadane max is ≤0 the array is all non-positive, so wrapping would be empty/invalid—return that max.
 * Approach: 1. Track running max/min Kadane, global max/min, and total from index 0. 2. For each later value update all five. 3. If `overallLargestSum > 0` return max(that, total−overallSmallestSum), else return `overallLargestSum`.
 * Dry Run: [5,-3,5] total=7, maxKadane=7, minKadane=-3 → max(7, 7-(-3)=10)=10. [-3,-2,-3] maxKadane=-2 ≤0 → -2.
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
      currentMaximumRunningSum + currentValue
    );
    overallLargestSum = Math.max(overallLargestSum, currentMaximumRunningSum);

    currentMinimumRunningSum = Math.min(
      currentValue,
      currentMinimumRunningSum + currentValue
    );
    overallSmallestSum = Math.min(overallSmallestSum, currentMinimumRunningSum);

    totalArrayElementsSum += currentValue;
  }

  return overallLargestSum > 0
    ? Math.max(overallLargestSum, totalArrayElementsSum - overallSmallestSum)
    : overallLargestSum;
};

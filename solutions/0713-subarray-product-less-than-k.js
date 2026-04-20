/**
 * Subarray Product Less Than K
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) {
    return 0;
  }

  let totalSubarrays = 0;
  let currentProductValue = 1;
  let windowStartPointer = 0;

  for (
    let windowEndPointer = 0;
    windowEndPointer < nums.length;
    windowEndPointer++
  ) {
    currentProductValue *= nums[windowEndPointer];

    while (currentProductValue >= k) {
      currentProductValue /= nums[windowStartPointer];
      windowStartPointer++;
    }

    totalSubarrays += windowEndPointer - windowStartPointer + 1;
  }

  return totalSubarrays;
};

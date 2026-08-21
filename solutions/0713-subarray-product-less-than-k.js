/**
 * Subarray Product Less Than K
 * Intuition: All numbers are positive, so a sliding window’s product is monotonic as the left bound moves. Every valid window ending at `windowEndPointer` contributes that many subarrays.
 * Approach: 1. If `k <= 1`, return 0. 2. Grow `currentProductValue` by `nums[windowEndPointer]`. 3. While the product is `>= k`, divide out `nums[windowStartPointer]` and advance the left pointer. 4. Add `windowEndPointer - windowStartPointer + 1` to `totalSubarrays`.
 * Dry Run: nums = [10,5,2,6], k = 100. Windows [10], [10,5], [5,2], [5,2,6], [2,6], [6] → 8 subarrays.
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

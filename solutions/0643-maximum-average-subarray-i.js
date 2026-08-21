/**
 * Maximum Average Subarray I
 * Intuition: A fixed window of length k has the same average ranking as its sum, so slide the sum and divide by k once at the end.
 * Approach: 1. Sum the first k elements into `currentWindowSum` as `overallMaximumSum`. 2. For each later index, drop `nums[trailingIndex-k]` and add `nums[trailingIndex]`. 3. Track the max sum. 4. Return maxSum / k.
 * Dry Run: nums=[1,12,-5,-6,50,3], k=4.
 *   - Window 1+12-5-6=2. Then 12-5-6+50=51. Then -5-6+50+3=42. Max 51 / 4 = 12.75.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findMaxAverage = function (nums, k) {
  let currentWindowSum = 0;
  for (let initialIndex = 0; initialIndex < k; initialIndex++) {
    currentWindowSum += nums[initialIndex];
  }

  let overallMaximumSum = currentWindowSum;

  for (let trailingIndex = k; trailingIndex < nums.length; trailingIndex++) {
    currentWindowSum =
      currentWindowSum - nums[trailingIndex - k] + nums[trailingIndex];
    overallMaximumSum = Math.max(overallMaximumSum, currentWindowSum);
  }

  return overallMaximumSum / k;
};

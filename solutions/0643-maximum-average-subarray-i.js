/**
 * Maximum Average Subarray I
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

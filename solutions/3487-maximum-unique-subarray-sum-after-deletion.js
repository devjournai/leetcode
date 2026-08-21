/**
 * Maximum Unique Subarray Sum After Deletion
 * Intuition: Deletion can drop any elements, so the best unique subarray is just a set of distinct values. Negatives never help unless every number is non-positive, in which case the answer is the maximum (least harmful) value.
 * Approach: 1. If the global max is <= 0, return it. 2. Otherwise sum each distinct positive number from a set of nums.
 * Dry Run: nums = [1,2,2,-1]. Distinct positives 1+2 = 3. nums = [-4,-2] → max is -2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxSum = function (nums) {
  let maxValue = nums[0];
  for (const num of nums) {
    maxValue = Math.max(maxValue, num);
  }
  if (maxValue <= 0) {
    return maxValue;
  }

  const uniqueValues = new Set(nums);
  let uniquePositiveSum = 0;
  for (const num of uniqueValues) {
    if (num > 0) {
      uniquePositiveSum += num;
    }
  }
  return uniquePositiveSum;
};

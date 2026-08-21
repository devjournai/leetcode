/**
 * Minimum Operations to Make Array Values Equal to K
 * Intuition: An operation replaces every occurrence of the current maximum with a strictly smaller value that already appears (or with `k`). If any value is already < k this is impossible. Otherwise we must “peel off” each distinct value above `k`, one operation per distinct value.
 * Approach: 1. If `min(nums) < k`, return -1. 2. Count unique values. 3. If the minimum is already `k`, we do not need an op for `k` itself, so answer is `unique - 1`. 4. If every value is > k, each unique value needs an op: answer is `unique`.
 * Dry Run: nums = [5, 2, 5, 4, 5], k = 2. Unique {2,4,5}, min=2=k → 3-1=2 operations (5→4, 4→2).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minOperations = function (nums, k) {
  const uniqueValues = new Set(nums);
  let minimumValue = Infinity;
  for (const num of nums) {
    minimumValue = Math.min(minimumValue, num);
  }

  if (minimumValue < k) {
    return -1;
  }
  if (minimumValue > k) {
    return uniqueValues.size;
  }
  return uniqueValues.size - 1;
};

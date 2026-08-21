/**
 * Smallest Stable Index II
 * Intuition: First, we preprocess an array right, where right[i] represents the minimum value among the elements in nums from index i to index n - 1. We can compute the right array by traversing nums from back to front.
 * Approach: First, we preprocess an array right, where right[i] represents the minimum value among the elements in nums from index i to index n - 1. We can compute the right array by traversing nums from back to front. Next, we traverse the nums array from front to back, maintaining a variable left, which represents the maximum value among the elements in nums from index 0 to index i. For each index i, we calculate the instability score as left - right[i]. If the instability score is less than or equal to k, we return index i. If no such index is found after the traversal, we return -1.
 * Dry Run: Input: nums = [5,0,1,4], k = 3. Output: 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var firstStableIndex = function (nums, k) {
  const n = nums.length;
  const right = new Array(n);
  right[n - 1] = nums[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    right[i] = Math.min(right[i + 1], nums[i]);
  }

  let left = 0;
  for (let i = 0; i < n; i++) {
    left = Math.max(left, nums[i]);
    if (left - right[i] <= k) {
      return i;
    }
  }
  return -1;
};

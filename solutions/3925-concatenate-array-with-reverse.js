/**
 * Concatenate Array With Reverse
 * Intuition: We create an array ans of length 2  *  n. The first n elements are the same as nums, and the next n elements are nums in reverse order.
 * Approach: We create an array ans of length 2  *  n. The first n elements are the same as nums, and the next n elements are nums in reverse order. Specifically, for 0 leq i leq n - 1, we set ans[i] = nums[i] and ans[i + n] = nums[n - i - 1]. Finally, return the array ans.
 * Dry Run: Input: nums = [1,2,3]. Output: [1,2,3,3,2,1].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var concatWithReverse = function (nums) {
  const n = nums.length;
  const ans = new Array(2 * n);
  for (let i = 0; i < n; ++i) {
    ans[i] = nums[i];
    ans[i + n] = nums[n - i - 1];
  }
  return ans;
};

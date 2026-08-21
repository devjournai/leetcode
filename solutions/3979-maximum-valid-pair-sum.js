/**
 * Maximum Valid Pair Sum
 * Intuition: For a valid pair (i, j), we require j - i geq k, i.e., i leq j - k. We enumerate the right endpoint j starting from k. For each j, the maximum left endpoint is j - k. We maintain the maximum value x of nums[i] in the range [0, j - k], and update the answer with x + nums[j].
 * Approach: 1. Follow Sliding Window. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [1,3,5,2,8], k = 2. Output: 13.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxValidPairSum = function (nums, k) {
  let [ans, x] = [0, 0];
  for (let j = k; j < nums.length; ++j) {
    const y = nums[j];
    x = Math.max(x, nums[j - k]);
    ans = Math.max(ans, x + y);
  }
  return ans;
};

/**
 * Special Array I
 * Intuition: Adjacent elements must have opposite parity, so compare each pair of neighbors.
 * Approach: 1. Walk i from 1 to n - 1. 2. If nums[i] and nums[i - 1] have the same remainder modulo 2, return false. 3. Return true if every pair differs.
 * Dry Run: nums = [4, 3, 1, 6]
 * - 4 and 3 differ in parity
 * - 3 and 1 are both odd -> return false
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isArraySpecial = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] % 2 === nums[i - 1] % 2) {
      return false;
    }
  }
  return true;
};

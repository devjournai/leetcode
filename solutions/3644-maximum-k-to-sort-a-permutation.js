/**
 * Maximum K to Sort a Permutation
 * Intuition: Indices that already hold their value need no swap. Any misplaced nums[i] must be AND-able with some k, so k cannot exceed the AND of all misplaced values. That AND is always a valid k (or 0 if none misplaced).
 * Approach: 1. ans = -1 (all bits). 2. For each i != nums[i], ans &= nums[i]. 3. Return max(ans, 0).
 * Dry Run: [0,3,2,1] misplaced 3 and 1, 3&1=1, k=1 sorts via swaps of indices whose values AND to 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sortPermutation = function (nums) {
  let answer = -1;
  for (let index = 0; index < nums.length; index++) {
    if (index !== nums[index]) {
      answer &= nums[index];
    }
  }
  return Math.max(answer, 0);
};

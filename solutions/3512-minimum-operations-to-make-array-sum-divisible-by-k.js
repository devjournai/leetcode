/**
 * Minimum Operations to Make Array Sum Divisible by K
 * Intuition: Each decrement reduces the total sum by 1, so the fewest operations equal the remainder of the sum modulo k.
 * Approach: 1. Sum every element. 2. Return that sum modulo k.
 * Dry Run: nums = [3, 9, 7], k = 5. Sum = 19, 19 % 5 = 4, so 4 decrements make the sum divisible by 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums, k) {
  let totalSum = 0;
  for (const value of nums) {
    totalSum += value;
  }
  return totalSum % k;
};

/**
 * Compute Alternating Sum
 * Intuition: Alternating sum is even-index terms minus odd-index terms.
 * Approach: Add nums[i] when i is even, subtract when i is odd.
 * Dry Run: [1, 3, 5] → 1 - 3 + 5 = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var alternatingSum = function (nums) {
  let sum = 0;
  for (let index = 0; index < nums.length; index++) {
    if (index % 2 === 0) {
      sum += nums[index];
    } else {
      sum -= nums[index];
    }
  }
  return sum;
};

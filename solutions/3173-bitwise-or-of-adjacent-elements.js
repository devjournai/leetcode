/**
 * Bitwise Or Of Adjacent Elements
 * Intuition: Each output value is simply nums[i] OR nums[i+1].
 * Approach: 1. Allocate an array of length n-1. 2. Fill answer[i] = nums[i] | nums[i+1]. 3. Return it.
 * Dry Run:
 *   nums = [1,3,7,15] -> [3,7,15]
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var orArray = function (nums) {
  const adjacentOrValues = [];
  for (let index = 0; index < nums.length - 1; index++) {
    adjacentOrValues.push(nums[index] | nums[index + 1]);
  }
  return adjacentOrValues;
};

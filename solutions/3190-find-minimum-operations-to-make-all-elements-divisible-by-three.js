/**
 * Find Minimum Operations To Make All Elements Divisible By Three
 * Intuition: Each number needs 0 operations if already divisible by 3, otherwise 1 (add or subtract 1).
 * Approach: 1. Count values whose remainder is not 0. 2. Return that count.
 * Dry Run:
 *   nums = [1,2,3,4] remainders 1,2,0,1 -> 3 operations
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumOperations = function (nums) {
  let operationCount = 0;
  for (const currentValue of nums) {
    if (currentValue % 3 !== 0) {
      operationCount++;
    }
  }
  return operationCount;
};

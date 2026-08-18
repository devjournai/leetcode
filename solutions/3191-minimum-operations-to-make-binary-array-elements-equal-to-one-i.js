/**
 * Minimum Operations To Make Binary Array Elements Equal To One I
 * Intuition: The only way to flip a 0 at index i (when later bits must stay 1) is to apply the length-3 flip at i, greedily from left to right.
 * Approach: 1. Scan left to right. 2. When nums[i] is 0 and i+2 is in range, flip i,i+1,i+2 and increment. 3. If any 0 remains, return -1.
 * Dry Run:
 *   nums = [0,1,1,1,0,0] flip at 0 then at 3 -> [1,0,0,0,1,1] then [1,0,0,1,0,0] wait:
 *   Start [0,1,1,1,0,0], flip 0: [1,0,0,1,0,0], flip 1: [1,1,1,0,0,0], flip 3: [1,1,1,1,1,1], operations = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let operationCount = 0;
  for (let index = 0; index + 2 < nums.length; index++) {
    if (nums[index] === 0) {
      nums[index] ^= 1;
      nums[index + 1] ^= 1;
      nums[index + 2] ^= 1;
      operationCount++;
    }
  }
  for (const bitValue of nums) {
    if (bitValue === 0) {
      return -1;
    }
  }
  return operationCount;
};

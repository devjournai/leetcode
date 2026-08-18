/**
 * Minimum Operations To Make Binary Array Elements Equal To One II
 * Intuition: A suffix flip from i is used exactly when the current bit, after previous flips' parity, is 0.
 * Approach: 1. Track flipParity of how many suffix flips have been applied so far. 2. For each index, actual bit is nums[i] xor flipParity. 3. If it is 0, flip here (increment operations and toggle parity).
 * Dry Run:
 *   nums = [0,1,1,0,1] flips at 0 and 3 -> 2 operations.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let operationCount = 0;
  let suffixFlipParity = 0;
  for (const bitValue of nums) {
    const currentBit = bitValue ^ suffixFlipParity;
    if (currentBit === 0) {
      operationCount++;
      suffixFlipParity ^= 1;
    }
  }
  return operationCount;
};

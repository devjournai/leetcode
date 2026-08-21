/**
 * Minimum Total Operations
 * Intuition: Each operation copies `nums[i+1]` onto `nums[i]`, so values can only flow leftward. Every adjacent mismatch must be overwritten, and each mismatch is independent, so the answer is the number of positions where `nums[i] !== nums[i-1]`.
 * Approach: 1. Walk the array from index 1. 2. Whenever the current value differs from the previous, increment `operationCount`. 3. Return `operationCount`.
 * Dry Run: nums = [1, 4, 2, 2]
 *   - 4 != 1 → 1
 *   - 2 != 4 → 2
 *   - 2 == 2 → stay 2. Answer 2 (copy 2 leftward twice).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let operationCount = 0;
  for (let index = 1; index < nums.length; index++) {
    if (nums[index] !== nums[index - 1]) {
      operationCount++;
    }
  }
  return operationCount;
};

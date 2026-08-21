/**
 * Move Zeroes
 * Intuition: Compact all non-zeros to the front in order, then fill the tail with zeros.
 * Approach: 1. Walk the array; copy each non-zero to nonZeroInsertionPointer and advance it. 2. From that pointer to the end, write 0.
 * Dry Run: nums = [0,1,0,3,12].
 *   - Copy 1,3,12 to indices 0,1,2. Fill indices 3,4 with 0.
 *   - Result [1,3,12,0,0].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var moveZeroes = function (nums) {
  let nonZeroInsertionPointer = 0;

  for (
    let currentElementExaminer = 0;
    currentElementExaminer < nums.length;
    currentElementExaminer++
  ) {
    if (nums[currentElementExaminer] !== 0) {
      nums[nonZeroInsertionPointer] = nums[currentElementExaminer];
      nonZeroInsertionPointer++;
    }
  }

  for (
    let zeroFillerIndex = nonZeroInsertionPointer;
    zeroFillerIndex < nums.length;
    zeroFillerIndex++
  ) {
    nums[zeroFillerIndex] = 0;
  }
};

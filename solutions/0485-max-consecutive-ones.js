/**
 * Max Consecutive Ones
 * Intuition: A running streak of 1s resets on any other value; the answer is the longest streak seen.
 * Approach: 1. Walk the array with `sequenceLength` and `currentMaximumCount`. 2. On 1, increment the streak; otherwise reset to 0. 3. After each index, `currentMaximumCount = max(currentMaximumCount, sequenceLength)`.
 * Dry Run: nums = [1,1,0,1,1,1].
 *   - Streak 1,2,0,1,2,3. Max becomes 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findMaxConsecutiveOnes = function (nums) {
  let currentMaximumCount = 0;
  let sequenceLength = 0;
  let arrayIterationIndex = 0;

  while (arrayIterationIndex < nums.length) {
    let valueAtIndex = nums[arrayIterationIndex];
    if (valueAtIndex === 1) {
      sequenceLength++;
    } else {
      sequenceLength = 0;
    }
    currentMaximumCount = Math.max(currentMaximumCount, sequenceLength);
    arrayIterationIndex++;
  }

  return currentMaximumCount;
};

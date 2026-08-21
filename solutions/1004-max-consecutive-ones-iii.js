/**
 * Max Consecutive Ones III
 * Intuition: The longest window with at most k zeros is the answer. Grow the right end and, when zeros exceed k, slide the left end so the window stays valid.
 * Approach: 1. Expand right; decrement remaining flips on each 0. 2. If flips go negative, restore a flip if the left cell was 0 and advance left. 3. After the scan, the window length is the maximum valid span.
 * Dry Run: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2.
 *   - Expand until three zeros force left to catch up; remaining flips stay non-negative only for windows using two zeros.
 *   - Final window covers the four 1s plus two flipped 0s, length 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestOnes = function (nums, k) {
  let windowStartPointer = 0;
  let remainingFlips = k;

  for (
    let windowEndPointer = 0;
    windowEndPointer < nums.length;
    windowEndPointer++
  ) {
    if (nums[windowEndPointer] === 0) {
      remainingFlips--;
    }

    if (remainingFlips < 0) {
      if (nums[windowStartPointer] === 0) {
        remainingFlips++;
      }
      windowStartPointer++;
    }
  }

  return windowEndPointer - windowStartPointer;
};

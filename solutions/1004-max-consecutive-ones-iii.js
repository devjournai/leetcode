/**
 * Max Consecutive Ones III
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

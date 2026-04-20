/**
 * Monotonic Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isMonotonic = function (nums) {
  let checkIncreasing = true;
  let checkDecreasing = true;

  for (
    let currentPosition = 0;
    currentPosition < nums.length - 1;
    currentPosition++
  ) {
    if (nums[currentPosition] > nums[currentPosition + 1]) {
      checkIncreasing = false;
    }
    if (nums[currentPosition] < nums[currentPosition + 1]) {
      checkDecreasing = false;
    }
  }

  return checkIncreasing || checkDecreasing;
};

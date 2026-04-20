/**
 * Check If All 1s Are At Least Length K Places Away
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var kLengthApart = function (nums, k) {
  let gapCount = -1;

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    let currentNumber = nums[elementIndex];

    if (currentNumber === 1) {
      if (gapCount !== -1 && gapCount < k) {
        return false;
      }
      gapCount = 0;
    } else {
      if (gapCount !== -1) {
        gapCount++;
      }
    }
  }

  return true;
};

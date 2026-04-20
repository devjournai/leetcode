/**
 * Global And Local Inversions
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isIdealPermutation = function (nums) {
  const inputLength = nums.length;

  for (let elementIndex = 0; elementIndex < inputLength; elementIndex++) {
    const elementValue = nums[elementIndex];
    const absoluteDisplacement = Math.abs(elementValue - elementIndex);

    if (absoluteDisplacement > 1) {
      return false;
    }
  }

  return true;
};

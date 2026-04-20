/**
 * Maximum Product Subarray
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProduct = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let globalMaximum = nums[0];
  let currentMaximumEndingHere = nums[0];
  let currentMinimumEndingHere = nums[0];

  for (let loopIndex = 1; loopIndex < nums.length; loopIndex++) {
    let currentElement = nums[loopIndex];
    let previousMaximumValue = currentMaximumEndingHere;
    let previousMinimumValue = currentMinimumEndingHere;

    currentMaximumEndingHere = Math.max(
      currentElement,
      previousMaximumValue * currentElement,
      previousMinimumValue * currentElement,
    );

    currentMinimumEndingHere = Math.min(
      currentElement,
      previousMaximumValue * currentElement,
      previousMinimumValue * currentElement,
    );

    globalMaximum = Math.max(globalMaximum, currentMaximumEndingHere);
  }

  return globalMaximum;
};

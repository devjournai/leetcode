/**
 * Minimum Increment To Make Array Unique
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minIncrementForUnique = function (nums) {
  nums.sort((firstNum, secondNum) => firstNum - secondNum);

  let calculatedTotal = 0;
  let nextExpectedValue = 0;
  let currentIndex = 0;

  if (nums.length === 0) {
    return 0;
  }

  nextExpectedValue = nums[0];
  currentIndex = 1;

  while (currentIndex < nums.length) {
    let currentElement = nums[currentIndex];

    if (currentElement <= nextExpectedValue) {
      let requiredNext = nextExpectedValue + 1;
      calculatedTotal += requiredNext - currentElement;
      nextExpectedValue = requiredNext;
    } else {
      nextExpectedValue = currentElement;
    }
    currentIndex++;
  }

  return calculatedTotal;
};

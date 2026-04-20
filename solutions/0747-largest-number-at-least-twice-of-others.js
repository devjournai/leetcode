/**
 * Largest Number At Least Twice Of Others
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var dominantIndex = function (nums) {
  const arrayLength = nums.length;

  if (arrayLength === 0) {
    return -1;
  }

  if (arrayLength === 1) {
    return 0;
  }

  let firstMaximumValue = Number.MIN_SAFE_INTEGER;
  let firstMaximumIndex = -1;
  let secondMaximumValue = Number.MIN_SAFE_INTEGER;

  for (
    let iteratorVariable = 0;
    iteratorVariable < arrayLength;
    iteratorVariable++
  ) {
    let currentNumber = nums[iteratorVariable];

    if (currentNumber > firstMaximumValue) {
      secondMaximumValue = firstMaximumValue;
      firstMaximumValue = currentNumber;
      firstMaximumIndex = iteratorVariable;
    } else if (currentNumber > secondMaximumValue) {
      secondMaximumValue = currentNumber;
    }
  }

  if (firstMaximumValue >= 2 * secondMaximumValue) {
    return firstMaximumIndex;
  } else {
    return -1;
  }
};

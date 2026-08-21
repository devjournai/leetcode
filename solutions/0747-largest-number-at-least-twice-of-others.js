/**
 * Largest Number At Least Twice Of Others
 * Intuition: The dominant index exists iff the maximum is at least twice the second maximum. Track both in one scan.
 * Approach: 1. Empty → -1; length 1 → 0. 2. Walk the array updating `firstMaximumValue`/`firstMaximumIndex` and `secondMaximumValue`. 3. Return the index if `firstMaximumValue >= 2 * secondMaximumValue`, else -1.
 * Dry Run: [3,6,1,0]. Max 6, second 3, 6≥6 → index 1. [1,2,3,4] max 4 < 6 → -1.
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

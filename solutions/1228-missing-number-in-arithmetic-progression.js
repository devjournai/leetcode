/**
 * Missing Number In Arithmetic Progression
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var missingNumber = function (arr) {
  const arrayCount = arr.length;
  const initialElement = arr[0];
  const finalElement = arr[arrayCount - 1];

  const totalSpanOfProgression = finalElement - initialElement;
  const commonStepValue = totalSpanOfProgression / arrayCount;

  for (
    let currentPosition = 0;
    currentPosition < arrayCount - 1;
    currentPosition++
  ) {
    const sequentialDifference =
      arr[currentPosition + 1] - arr[currentPosition];
    if (sequentialDifference !== commonStepValue) {
      return arr[currentPosition] + commonStepValue;
    }
  }

  return initialElement + commonStepValue;
};

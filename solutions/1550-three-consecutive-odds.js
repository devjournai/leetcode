/**
 * Three Consecutive Odds
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var threeConsecutiveOdds = function (arr) {
  const arraySize = arr.length;
  if (arraySize < 3) {
    return false;
  }

  for (
    let currentPosition = 0;
    currentPosition <= arraySize - 3;
    currentPosition++
  ) {
    const firstValue = arr[currentPosition];
    const secondValue = arr[currentPosition + 1];
    const thirdValue = arr[currentPosition + 2];

    if (firstValue % 2 !== 0 && secondValue % 2 !== 0 && thirdValue % 2 !== 0) {
      return true;
    }
  }

  return false;
};

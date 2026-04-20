/**
 * Arithmetic Slices II Subsequence
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var numberOfArithmeticSlices = function (numbersArray) {
  const memoizationTable = new Array(numbersArray.length)
    .fill(null)
    .map(() => new Map());
  let totalArithmeticSubsequences = 0;

  for (
    let currentElementIndex = 1;
    currentElementIndex < numbersArray.length;
    ++currentElementIndex
  ) {
    for (
      let previousElementIndex = 0;
      previousElementIndex < currentElementIndex;
      ++previousElementIndex
    ) {
      const commonDifference =
        numbersArray[currentElementIndex] - numbersArray[previousElementIndex];

      const countFromPrevious =
        memoizationTable[previousElementIndex].get(commonDifference) || 0;

      const countAtCurrent =
        (memoizationTable[currentElementIndex].get(commonDifference) || 0) +
        countFromPrevious +
        1;

      memoizationTable[currentElementIndex].set(
        commonDifference,
        countAtCurrent,
      );

      totalArithmeticSubsequences += countFromPrevious;
    }
  }

  return totalArithmeticSubsequences;
};

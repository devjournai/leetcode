/**
 * K Th Smallest Prime Fraction
 * Time Complexity: O(n * log(MAX_FRACTION_VALUE / EPSILON))
 * Space Complexity: O(1)
 */
var kthSmallestPrimeFraction = function (arr, k) {
  const arrayLength = arr.length;
  let searchLowerBound = 0;
  let searchUpperBound = 1;

  while (searchLowerBound < searchUpperBound) {
    const currentTestValue = (searchLowerBound + searchUpperBound) / 2;
    let countedFractions = 0;
    let maximumNumerator = 0;
    let maximumDenominator = 1;
    let rightmostPointer = 1;

    for (
      let currentLeftIndex = 0;
      currentLeftIndex < arrayLength - 1;
      currentLeftIndex++
    ) {
      while (
        rightmostPointer < arrayLength &&
        arr[currentLeftIndex] > currentTestValue * arr[rightmostPointer]
      ) {
        rightmostPointer++;
      }

      countedFractions += arrayLength - rightmostPointer;

      if (
        rightmostPointer < arrayLength &&
        arr[currentLeftIndex] * maximumDenominator >
          maximumNumerator * arr[rightmostPointer]
      ) {
        maximumNumerator = arr[currentLeftIndex];
        maximumDenominator = arr[rightmostPointer];
      }
    }

    if (countedFictions === k) {
      return [maximumNumerator, maximumDenominator];
    } else if (countedFractions < k) {
      searchLowerBound = currentTestValue;
    } else {
      searchUpperBound = currentTestValue;
    }
  }

  return [];
};

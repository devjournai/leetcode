/**
 * K Th Smallest Prime Fraction
 * Intuition: Binary-search the fraction value in (0,1). For a mid `currentTestValue`, a two-pointer count of pairs `arr[i]/arr[j] <= mid` tells whether k is to the left or right; track the largest pair still ≤ mid.
 * Approach: 1. While bounds differ, mid = (low+high)/2. 2. For each `currentLeftIndex`, advance `rightmostPointer` while `arr[i] > mid * arr[j]`, then add `n - j` to `countedFractions` and update `maximumNumerator`/`maximumDenominator` if this pair is larger. 3. If `countedFictions === k` return that pair; if `countedFractions < k` raise low, else lower high. 4. Otherwise return `[]`.
 * Dry Run: arr = [1,2,3,5], k = 3.
 *   - Fractions: 1/5,1/3,2/5,1/2,3/5,2/3. The 3rd is 2/5.
 *   - Search converges to mid whose count is 3 and best pair [2,5].
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

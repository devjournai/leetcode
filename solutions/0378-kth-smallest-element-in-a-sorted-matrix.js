/**
 * Kth Smallest Element In A Sorted Matrix
 * Intuition: The answer is some matrix value in [min, max]. Binary-search that value range; from the top-right, count how many entries are ≤ mid and remember the largest such entry, then shrink toward the k-th.
 * Approach: 1. low = matrix[0][0], high = matrix[n-1][n-1]. 2. `evaluateCountAndMax` walks each row from the right, adding (col+1) when ≤ target and tracking the max ≤ target. 3. If count < k, search higher; else record that max and search lower.
 * Dry Run: [[1,5,9],[10,11,13],[12,13,15]], k = 8. Mid around 8: count of ≤8 is 2 (<8) raise low; later mid 13 counts ≥8 and largestSeen 13 becomes the answer.
 * Time Complexity: O(N * log(MAX_VAL - MIN_VAL))
 * Space Complexity: O(1)
 */
var kthSmallest = function (matrixParam, kParam) {
  const matrixDimension = matrixParam.length;

  let searchRangeLow = matrixParam[0][0];
  let searchRangeHigh = matrixParam[matrixDimension - 1][matrixDimension - 1];
  let finalKthElement = matrixParam[0][0];

  const evaluateCountAndMax = (currentTarget) => {
    let elementsBelowTarget = 0;
    let maximumFound = -Infinity;

    let rowIndexIterator = 0;
    let colIndexIterator = matrixDimension - 1;

    while (rowIndexIterator < matrixDimension && colIndexIterator >= 0) {
      if (matrixParam[rowIndexIterator][colIndexIterator] <= currentTarget) {
        elementsBelowTarget += colIndexIterator + 1;
        maximumFound = Math.max(
          maximumFound,
          matrixParam[rowIndexIterator][colIndexIterator]
        );
        rowIndexIterator++;
      } else {
        colIndexIterator--;
      }
    }
    return [elementsBelowTarget, maximumFound];
  };

  while (searchRangeLow <= searchRangeHigh) {
    const pivotValue =
      searchRangeLow + Math.floor((searchRangeHigh - searchRangeLow) / 2);
    const [currentElementsCount, largestValueSeen] =
      evaluateCountAndMax(pivotValue);

    if (currentElementsCount < kParam) {
      searchRangeLow = pivotValue + 1;
    } else {
      finalKthElement = largestValueSeen;
      searchRangeHigh = pivotValue - 1;
    }
  }

  return finalKthElement;
};

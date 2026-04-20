/**
 * Find The Kth Smallest Sum Of A Matrix With Sorted Rows
 * Time Complexity: O(m * k * n * log(k * n))
 * Space Complexity: O(k * n)
 */
var kthSmallest = function (mat, k) {
  let currentPossibleSums = [0];
  const totalRowsCount = mat.length;

  for (
    let currentRowIndex = 0;
    currentRowIndex < totalRowsCount;
    currentRowIndex++
  ) {
    const nextIterationSums = [];
    const currentRowElements = mat[currentRowIndex];

    for (const previousSumElement of currentPossibleSums) {
      for (const currentMatrixValue of currentRowElements) {
        const combinedValue = previousSumElement + currentMatrixValue;
        nextIterationSums.push(combinedValue);
      }
    }

    nextIterationSums.sort(
      (firstValue, secondValue) => firstValue - secondValue,
    );
    const effectiveLimit = Math.min(k, nextIterationSums.length);
    currentPossibleSums = nextIterationSums.slice(0, effectiveLimit);
  }

  const finalResultIndex = k - 1;
  return currentPossibleSums[finalResultIndex];
};

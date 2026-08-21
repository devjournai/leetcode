/**
 * Find The Kth Smallest Sum Of A Matrix With Sorted Rows
 * Intuition: Merge row by row: each previous candidate sum plus every value in the next row, then keep only the k smallest so the search stays bounded.
 * Approach: 1. Start with currentPossibleSums = [0]. 2. For each row, form all previousSum + rowValue combinations. 3. Sort and keep the first min(k, length) sums. 4. After all rows, return the (k-1)th remaining sum.
 * Dry Run: mat = [[1,3,11],[2,4,6]], k = 5
 *   - after row0: [1,3,11]
 *   - after row1 combinations sorted: 3,5,7,5,7,9,13,15,17 -> keep 5 smallest [3,5,5,7,7]
 *   - kth = 7
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
      (firstValue, secondValue) => firstValue - secondValue
    );
    const effectiveLimit = Math.min(k, nextIterationSums.length);
    currentPossibleSums = nextIterationSums.slice(0, effectiveLimit);
  }

  const finalResultIndex = k - 1;
  return currentPossibleSums[finalResultIndex];
};

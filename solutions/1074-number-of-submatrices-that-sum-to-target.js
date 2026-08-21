/**
 * Number Of Submatrices That Sum To Target
 * Intuition: Fix the top and bottom rows and compress each column into a 1D prefix. Counting subarrays with sum=target on that 1D array (hash of prefix frequencies) enumerates every submatrix.
 * Approach: 1. For each firstRow, zero a column-sum array. 2. Extend secondRow, adding that row into the column sums. 3. Scan prefixes; add map[prefix−target] then record prefix. 4. Sum over all row pairs.
 * Dry Run: [[0,1],[1,0]] target=1. Row pair (0,0) finds two 1s; (1,1) two 1s; (0,1) two 1s from columns → 4.
 * Time Complexity: O(rows^2 * cols)
 * Space Complexity: O(cols)
 */
var numSubmatrixSumTarget = function (matrix, target) {
  const matrixRowCount = matrix.length;
  const matrixColCount = matrix[0].length;
  let finalSubmatrixCount = 0;

  for (let firstRow = 0; firstRow < matrixRowCount; firstRow++) {
    const columnWiseSums = new Array(matrixColCount).fill(0);
    for (let secondRow = firstRow; secondRow < matrixRowCount; secondRow++) {
      const sumFrequencyTracker = new Map();
      sumFrequencyTracker.set(0, 1);
      let runningColumnAccumulation = 0;

      for (
        let currentColumnIndex = 0;
        currentColumnIndex < matrixColCount;
        currentColumnIndex++
      ) {
        columnWiseSums[currentColumnIndex] +=
          matrix[secondRow][currentColumnIndex];
        runningColumnAccumulation += columnWiseSums[currentColumnIndex];
        const neededValue = runningColumnAccumulation - target;
        finalSubmatrixCount += sumFrequencyTracker.get(neededValue) || 0;
        sumFrequencyTracker.set(
          runningColumnAccumulation,
          (sumFrequencyTracker.get(runningColumnAccumulation) || 0) + 1
        );
      }
    }
  }

  return finalSubmatrixCount;
};

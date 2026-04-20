/**
 * Number Of Submatrices That Sum To Target
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
          (sumFrequencyTracker.get(runningColumnAccumulation) || 0) + 1,
        );
      }
    }
  }

  return finalSubmatrixCount;
};

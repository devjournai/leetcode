/**
 * Minimum Falling Path Sum II
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minFallingPathSum = function (grid) {
  const matrixSize = grid.length;

  let previousRowMinimums = [...grid[0]];

  for (
    let currentProcessingRow = 1;
    currentProcessingRow < matrixSize;
    currentProcessingRow++
  ) {
    let smallestValueOverall = Infinity;
    let smallestValueColumnIndex = -1;
    let secondSmallestValueOverall = Infinity;

    for (
      let iterationColumn = 0;
      iterationColumn < matrixSize;
      iterationColumn++
    ) {
      let actualValue = previousRowMinimums[iterationColumn];
      if (actualValue < smallestValueOverall) {
        secondSmallestValueOverall = smallestValueOverall;
        smallestValueOverall = actualValue;
        smallestValueColumnIndex = iterationColumn;
      } else if (actualValue < secondSmallestValueOverall) {
        secondSmallestValueOverall = actualValue;
      }
    }

    const currentRowMinimums = new Array(matrixSize);

    for (
      let targetResultColumn = 0;
      targetResultColumn < matrixSize;
      targetResultColumn++
    ) {
      let cellOriginalValue = grid[currentProcessingRow][targetResultColumn];
      if (targetResultColumn === smallestValueColumnIndex) {
        currentRowMinimums[targetResultColumn] =
          cellOriginalValue + secondSmallestValueOverall;
      } else {
        currentRowMinimums[targetResultColumn] =
          cellOriginalValue + smallestValueOverall;
      }
    }
    previousRowMinimums = currentRowMinimums;
  }

  return Math.min(...previousRowMinimums);
};

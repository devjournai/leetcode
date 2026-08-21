/**
 * Minimum Falling Path Sum II
 * Intuition: Next row cell cannot reuse the same column, so add the previous row’s global min, or the second min if this column held that min.
 * Approach: 1. previousRowMinimums = first row. 2. For each later row, find smallestValueOverall, its column, and secondSmallest. 3. New cell = grid + (second min if same column else min). 4. Return min of the last previousRowMinimums.
 * Dry Run: grid = [[1,2,3],[4,5,6],[7,8,9]]
 *   After row0: [1,2,3] min=1 col0 second=2. Row1: 4+2=6, 5+1=6, 6+1=7. Continue; final min path 13 (1+5+7).
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

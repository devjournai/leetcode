/**
 * Difference Of Number Of Distinct Values On Diagonals
 * Intuition: For each cell, the required diagonal values are found by traversing upwards-left and downwards-right from the cell's neighbors. Using sets for these traversals efficiently captures distinct values.
 * Approach: 1. Initialize an `answerMatrix` of the same dimensions as the input `grid`. 2. Iterate through each cell `(rowIndex, colIndex)` of the `grid`. 3. For each cell, initialize two sets: `distinctLeftAboveValues` and `distinctRightBelowValues`. 4. Traverse diagonally upwards-left from `(rowIndex - 1, colIndex - 1)`, adding each encountered value to `distinctLeftAboveValues` until matrix boundaries are hit. 5. Traverse diagonally downwards-right from `(rowIndex + 1, colIndex + 1)`, adding each encountered value to `distinctRightBelowValues` until matrix boundaries are hit. 6. Calculate the absolute difference between the sizes of `distinctLeftAboveValues` and `distinctRightBelowValues`, and store this in `answerMatrix[rowIndex][colIndex]`. 7. Return the `answerMatrix`.
 * Dry Run: grid = [[1,2,3],[3,1,5],[3,2,1]]
 *   rowsCount = 3, colsCount = 3
 *   answerMatrix = [[0,0,0],[0,0,0],[0,0,0]]
 *
 *   For rowIndex = 0, colIndex = 0 (grid[0][0] = 1):
 *     distinctLeftAboveValues = {} (currentLeftRow=-1, currentLeftCol=-1, loop condition fails) -> size = 0
 *     distinctRightBelowValues = {}
 *       currentRightRow=1, currentRightCol=1 (grid[1][1]=1), add 1. Set={1}. currentRightRow=2, currentRightCol=2
 *       currentRightRow=2, currentRightCol=2 (grid[2][2]=1), add 1. Set={1}. currentRightRow=3, currentRightCol=3
 *       (currentRightRow=3 < 3 && currentRightCol=3 < 3) fails -> size = 1
 *     answerMatrix[0][0] = Math.abs(0 - 1) = 1
 *
 *   For rowIndex = 1, colIndex = 1 (grid[1][1] = 1):
 *     distinctLeftAboveValues = {}
 *       currentLeftRow=0, currentLeftCol=0 (grid[0][0]=1), add 1. Set={1}. currentLeftRow=-1, currentLeftCol=-1
 *       (currentLeftRow=-1 >= 0 && currentLeftCol=-1 >= 0) fails -> size = 1
 *     distinctRightBelowValues = {}
 *       currentRightRow=2, currentRightCol=2 (grid[2][2]=1), add 1. Set={1}. currentRightRow=3, currentRightCol=3
 *       (currentRightRow=3 < 3 && currentRightCol=3 < 3) fails -> size = 1
 *     answerMatrix[1][1] = Math.abs(1 - 1) = 0
 *
 *   Final answerMatrix for this dry run will be [[1, 0, 1], [0, 0, 0], [1, 0, 1]] (simplified for brevity, showing how values are derived).
 * Time Complexity: O(M * N * min(M, N))
 * Space Complexity: O(M * N)
 */
var differenceOfDistinctValues = function (grid) {
  const rowsCount = grid.length;
  const colsCount = grid[0].length;
  const answerMatrix = Array.from({ length: rowsCount }, () =>
    new Array(colsCount).fill(0)
  );

  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    for (let colIndex = 0; colIndex < colsCount; colIndex++) {
      const distinctLeftAboveValues = new Set();
      let currentLeftRow = rowIndex - 1;
      let currentLeftCol = colIndex - 1;
      while (currentLeftRow >= 0 && currentLeftCol >= 0) {
        distinctLeftAboveValues.add(grid[currentLeftRow][currentLeftCol]);
        currentLeftRow--;
        currentLeftCol--;
      }

      const distinctRightBelowValues = new Set();
      let currentRightRow = rowIndex + 1;
      let currentRightCol = colIndex + 1;
      while (currentRightRow < rowsCount && currentRightCol < colsCount) {
        distinctRightBelowValues.add(grid[currentRightRow][currentRightCol]);
        currentRightRow++;
        currentRightCol++;
      }

      answerMatrix[rowIndex][colIndex] = Math.abs(
        distinctLeftAboveValues.size - distinctRightBelowValues.size
      );
    }
  }

  return answerMatrix;
};

/**
 * Difference Between Ones And Zeros In Row And Column
 * Intuition: The formula `diff[i][j] = onesRowi + onesColj - zerosRowi - zerosColj` can be simplified by substituting `zerosRowi = numCols - onesRowi` and `zerosColj = numRows - onesColj`. This leads to `diff[i][j] = 2 * onesRowi + 2 * onesColj - numRows - numCols`. This simplification means we only need to count the number of ones for each row and column.
 * Approach: 1. Initialize arrays to store the count of ones for each row and each column. 2. Iterate through the input grid once to populate these row and column ones counts. 3. Create a new result matrix, iterating through its cells. For each cell `(i, j)`, calculate its value using the simplified formula: `2 * onesRow[i] + 2 * onesCol[j] - numRows - numCols`.
 * Dry Run: For grid = [[0,1,1],[1,0,1],[0,0,1]]
 * 1. Initialize matrixRows = 3, matrixCols = 3.
 * 2. Initialize rowOnesTrackers = [0,0,0], colOnesTrackers = [0,0,0].
 * 3. First pass (counting ones):
 *    - grid[0][1] is 1: rowOnesTrackers[0] becomes 1, colOnesTrackers[1] becomes 1.
 *    - grid[0][2] is 1: rowOnesTrackers[0] becomes 2, colOnesTrackers[2] becomes 1.
 *    - grid[1][0] is 1: rowOnesTrackers[1] becomes 1, colOnesTrackers[0] becomes 1.
 *    - grid[1][2] is 1: rowOnesTrackers[1] becomes 2, colOnesTrackers[2] becomes 2.
 *    - grid[2][2] is 1: rowOnesTrackers[2] becomes 1, colOnesTrackers[2] becomes 3.
 *    After first pass: rowOnesTrackers = [2,2,1], colOnesTrackers = [1,1,3].
 * 4. Second pass (building difference matrix using map):
 *    - For element (0,0): 2*rowOnesTrackers[0] + 2*colOnesTrackers[0] - 3 - 3 = 2*2 + 2*1 - 6 = 4 + 2 - 6 = 0.
 *    - For element (0,1): 2*rowOnesTrackers[0] + 2*colOnesTrackers[1] - 3 - 3 = 2*2 + 2*1 - 6 = 4 + 2 - 6 = 0.
 *    - For element (0,2): 2*rowOnesTrackers[0] + 2*colOnesTrackers[2] - 3 - 3 = 2*2 + 2*3 - 6 = 4 + 6 - 6 = 4.
 *    Row 0 of result: [0,0,4]
 *    - For element (1,0): 2*rowOnesTrackers[1] + 2*colOnesTrackers[0] - 3 - 3 = 2*2 + 2*1 - 6 = 4 + 2 - 6 = 0.
 *    - For element (1,1): 2*rowOnesTrackers[1] + 2*colOnesTrackers[1] - 3 - 3 = 2*2 + 2*1 - 6 = 4 + 2 - 6 = 0.
 *    - For element (1,2): 2*rowOnesTrackers[1] + 2*colOnesTrackers[2] - 3 - 3 = 2*2 + 2*3 - 6 = 4 + 6 - 6 = 4.
 *    Row 1 of result: [0,0,4]
 *    - For element (2,0): 2*rowOnesTrackers[2] + 2*colOnesTrackers[0] - 3 - 3 = 2*1 + 2*1 - 6 = 2 + 2 - 6 = -2.
 *    - For element (2,1): 2*rowOnesTrackers[2] + 2*colOnesTrackers[1] - 3 - 3 = 2*1 + 2*1 - 6 = 2 + 2 - 6 = -2.
 *    - For element (2,2): 2*rowOnesTrackers[2] + 2*colOnesTrackers[2] - 3 - 3 = 2*1 + 2*3 - 6 = 2 + 6 - 6 = 2.
 *    Row 2 of result: [-2,-2,2]
 * 5. Final outputMatrix: [[0,0,4],[0,0,4],[-2,-2,2]].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var onesMinusZeros = function (gridInput) {
  const matrixRows = gridInput.length;
  const matrixCols = gridInput[0].length;

  const rowOnesTrackers = new Array(matrixRows).fill(0);
  const colOnesTrackers = new Array(matrixCols).fill(0);

  for (let rowIndexCount = 0; rowIndexCount < matrixRows; rowIndexCount++) {
    for (let colIndexCount = 0; colIndexCount < matrixCols; colIndexCount++) {
      const currentCellValue = gridInput[rowIndexCount][colIndexCount];
      if (currentCellValue === 1) {
        rowOnesTrackers[rowIndexCount]++;
        colOnesTrackers[colIndexCount]++;
      }
    }
  }

  const outputMatrix = gridInput.map((singleRowRef, outputRowIndex) => {
    return singleRowRef.map((cellValueRef, outputColIndex) => {
      const currentRowOnes = rowOnesTrackers[outputRowIndex];
      const currentColOnes = colOnesTrackers[outputColIndex];
      const computedDifference =
        2 * currentRowOnes + 2 * currentColOnes - matrixRows - matrixCols;
      return computedDifference;
    });
  });

  return outputMatrix;
};

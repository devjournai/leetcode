/**
 * Increment Submatrices By One
 * Intuition: A direct approach of iterating through each submatrix for every query would be too slow. We can optimize by using a 2D difference array (also known as a 2D Fenwick tree or 2D prefix sum array in reverse). By marking the corners of each submatrix with increments and decrements, we can later compute the actual values for each cell in O(N^2) time using two passes of prefix sums.
 * Approach: 1. Initialize an n x n matrix `resultGrid` with zeros. 2. For each query `[row1, col1, row2, col2]`, apply difference array technique: increment `resultGrid[row1][col1]`, decrement `resultGrid[row1][col2 + 1]` (if within bounds), decrement `resultGrid[row2 + 1][col1]` (if within bounds), and increment `resultGrid[row2 + 1][col2 + 1]` (if within bounds). 3. Perform a horizontal prefix sum pass: for each row, starting from the second column, add the value from the previous column to the current cell. This propagates the effects of column-wise start/end markers. 4. Perform a vertical prefix sum pass: for each column, starting from the second row, add the value from the previous row to the current cell. This propagates the effects of row-wise start/end markers. 5. Return the final `resultGrid`.
 * Dry Run: n = 3, queries = [[1,1,2,2], [0,0,1,1]]
 * 1. Initialize resultGrid: [[0,0,0],[0,0,0],[0,0,0]]
 * 2. Process queries:
 *    - Query [1,1,2,2]:
 *      resultGrid[1][1]++ -> resultGrid = [[0,0,0],[0,1,0],[0,0,0]]
 *      (2+1=3, 3 is out of bounds for row/col n=3, so other marks skipped)
 *    - Query [0,0,1,1]:
 *      resultGrid[0][0]++ -> resultGrid = [[1,0,0],[0,1,0],[0,0,0]]
 *      (1+1=2, 2 < 3 for rows) resultGrid[2][0]-- -> resultGrid = [[1,0,0],[0,1,0],[-1,0,0]]
 *      (1+1=2, 2 < 3 for cols) resultGrid[0][2]-- -> resultGrid = [[1,0,-1],[0,1,0],[-1,0,0]]
 *      (2 < 3 && 2 < 3) resultGrid[2][2]++ -> resultGrid = [[1,0,-1],[0,1,0],[-1,0,1]]
 *    After queries: resultGrid = [[1,0,-1],[0,1,0],[-1,0,1]]
 * 3. Horizontal Prefix Sum:
 *    - Row 0: resultGrid[0][1]+=resultGrid[0][0] (0+1=1), resultGrid[0][2]+=resultGrid[0][1] (-1+1=0)
 *    - Row 1: resultGrid[1][1]+=resultGrid[1][0] (1+0=1), resultGrid[1][2]+=resultGrid[1][1] (0+1=1)
 *    - Row 2: resultGrid[2][1]+=resultGrid[2][0] (0-1=-1), resultGrid[2][2]+=resultGrid[2][1] (1-1=0)
 *    After horizontal pass: resultGrid = [[1,1,0],[0,1,1],[-1,-1,0]]
 * 4. Vertical Prefix Sum:
 *    - Col 0: resultGrid[1][0]+=resultGrid[0][0] (0+1=1), resultGrid[2][0]+=resultGrid[1][0] (-1+1=0)
 *    - Col 1: resultGrid[1][1]+=resultGrid[0][1] (1+1=2), resultGrid[2][1]+=resultGrid[1][1] (-1+2=1)
 *    - Col 2: resultGrid[1][2]+=resultGrid[0][2] (1+0=1), resultGrid[2][2]+=resultGrid[1][2] (0+1=1)
 *    After vertical pass: resultGrid = [[1,1,0],[1,2,1],[0,1,1]]
 * 5. Return: [[1,1,0],[1,2,1],[0,1,1]]
 * Time Complexity: O(N^2 + Q)
 * Space Complexity: O(N^2)
 */
var rangeAddQueries = function (n, queries) {
  const resultGrid = new Array(n).fill(null).map(() => new Array(n).fill(0));

  for (const queryDetails of queries) {
    const startRow = queryDetails[0];
    const startCol = queryDetails[1];
    const endRow = queryDetails[2];
    const endCol = queryDetails[3];

    resultGrid[startRow][startCol]++;

    const nextRow = endRow + 1;
    const nextCol = endCol + 1;

    if (nextRow < n) {
      resultGrid[nextRow][startCol]--;
    }
    if (nextCol < n) {
      resultGrid[startRow][nextCol]--;
    }
    if (nextRow < n && nextCol < n) {
      resultGrid[nextRow][nextCol]++;
    }
  }

  for (let currentRowIdx = 0; currentRowIdx < n; currentRowIdx++) {
    for (let currentColIdx = 1; currentColIdx < n; currentColIdx++) {
      resultGrid[currentRowIdx][currentColIdx] +=
        resultGrid[currentRowIdx][currentColIdx - 1];
    }
  }

  for (let verticalRowIdx = 1; verticalRowIdx < n; verticalRowIdx++) {
    for (let verticalColIdx = 0; verticalColIdx < n; verticalColIdx++) {
      resultGrid[verticalRowIdx][verticalColIdx] +=
        resultGrid[verticalRowIdx - 1][verticalColIdx];
    }
  }

  return resultGrid;
};

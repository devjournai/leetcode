/**
 * Check If Matrix Is X Matrix
 * Intuition: An X-Matrix has strict value requirements based on element position: non-zero for diagonal elements and zero for non-diagonal elements. Therefore, we can traverse each cell, determine its positional category, and immediately return false if its value violates the specific rule for that category.
 * Approach: 1. Obtain the dimension 'n' of the square matrix. 2. Iterate through each cell of the matrix using nested loops, defining current row as 'rowIndex' and current column as 'columnIndex'. 3. For each cell, determine if it lies on the main diagonal (where 'rowIndex' equals 'columnIndex') or the anti-diagonal (where 'rowIndex' plus 'columnIndex' equals 'n - 1'). 4. If the cell is identified as being on a diagonal, verify that its value is not zero; if it is zero, return false. 5. If the cell is identified as not being on a diagonal, verify that its value is zero; if it is non-zero, return false. 6. If the iteration completes without any violations, return true.
 * Dry Run: grid = [[2,0,0,1],[0,4,1,5],[0,5,2,0],[4,2,0,2]]
 * matrixDimension = 4
 *
 * (rowIndex, columnIndex) = (0,0):
 *   mainDiagonalCheck = (0 === 0) -> true
 *   antiDiagonalCheck = (0 + 0 === 4 - 1) -> false
 *   isCurrentCellDiagonal = true || false -> true
 *   cellValue = grid[0][0] = 2
 *   isCurrentCellDiagonal is true: cellValue (2) === 0 is false. Continue.
 *
 * (rowIndex, columnIndex) = (0,1):
 *   mainDiagonalCheck = (0 === 1) -> false
 *   antiDiagonalCheck = (0 + 1 === 4 - 1) -> false
 *   isCurrentCellDiagonal = false || false -> false
 *   cellValue = grid[0][1] = 0
 *   isCurrentCellDiagonal is false: cellValue (0) !== 0 is false. Continue.
 *
 * (rowIndex, columnIndex) = (0,2):
 *   mainDiagonalCheck = (0 === 2) -> false
 *   antiDiagonalCheck = (0 + 2 === 4 - 1) -> false
 *   isCurrentCellDiagonal = false || false -> false
 *   cellValue = grid[0][2] = 0
 *   isCurrentCellDiagonal is false: cellValue (0) !== 0 is false. Continue.
 *
 * (rowIndex, columnIndex) = (0,3):
 *   mainDiagonalCheck = (0 === 3) -> false
 *   antiDiagonalCheck = (0 + 3 === 4 - 1) -> true
 *   isCurrentCellDiagonal = false || true -> true
 *   cellValue = grid[0][3] = 1
 *   isCurrentCellDiagonal is true: cellValue (1) === 0 is false. Continue.
 *
 * ... (This process continues for all 16 cells. For the given input, all checks will pass.) ...
 *
 * After all cells are checked, no 'false' was returned.
 * The function returns true.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var checkXMatrix = function (grid) {
  const matrixDimension = grid.length;

  for (let rowIndex = 0; rowIndex < matrixDimension; rowIndex++) {
    for (let columnIndex = 0; columnIndex < matrixDimension; columnIndex++) {
      const mainDiagonalCheck = rowIndex === columnIndex;
      const antiDiagonalCheck = rowIndex + columnIndex === matrixDimension - 1;
      const isCurrentCellDiagonal = mainDiagonalCheck || antiDiagonalCheck;
      const cellValue = grid[rowIndex][columnIndex];

      if (isCurrentCellDiagonal) {
        if (cellValue === 0) {
          return false;
        }
      } else {
        if (cellValue !== 0) {
          return false;
        }
      }
    }
  }

  return true;
};

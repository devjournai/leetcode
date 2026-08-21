/**
 * Set Matrix Zeroes
 * Intuition: Use the first row and first column as in-place flags for which rows/cols must become zero, after recording whether the first row/column themselves already contained a zero.
 * Approach: 1. Scan row 0 and column 0 into `shouldZeroFirstRow` / `shouldZeroFirstColumn`. 2. For the inner submatrix, if a cell is 0, set matrix[i][0] and matrix[0][j] to 0. 3. Zero inner cells whose row or column flag is 0. 4. Finally zero the first row and/or first column if those flags were set.
 * Dry Run: [[1,1,1],[1,0,1],[1,1,1]] → inner 0 marks row1/col1 → inner becomes [[1,1,1],[1,0,0],[1,0,1]] then first row/col stay → [[1,0,1],[0,0,0],[1,0,1]]
 * Time Complexity: O(m*n)
 * Space Complexity: O(1)
 */
var setZeroes = function (matrix) {
  const matrixRowCount = matrix.length;
  const matrixColCount = matrix[0].length;

  let shouldZeroFirstRow = false;
  let shouldZeroFirstColumn = false;

  for (const firstRowItem of matrix[0]) {
    if (firstRowItem === 0) {
      shouldZeroFirstRow = true;
      break;
    }
  }

  let currentColumnCheck = 0;
  while (currentColumnCheck < matrixRowCount) {
    if (matrix[currentColumnCheck][0] === 0) {
      shouldZeroFirstColumn = true;
      break;
    }
    currentColumnCheck++;
  }

  for (
    let currentInternalRow = 1;
    currentInternalRow < matrixRowCount;
    currentInternalRow++
  ) {
    for (
      let currentInternalCol = 1;
      currentInternalCol < matrixColCount;
      currentInternalCol++
    ) {
      if (matrix[currentInternalRow][currentInternalCol] === 0) {
        matrix[currentInternalRow][0] = 0;
        matrix[0][currentInternalCol] = 0;
      }
    }
  }

  let targetMatrixRow = 1;
  while (targetMatrixRow < matrixRowCount) {
    for (
      let targetMatrixCol = 1;
      targetMatrixCol < matrixColCount;
      targetMatrixCol++
    ) {
      if (
        matrix[targetMatrixRow][0] === 0 ||
        matrix[0][targetMatrixCol] === 0
      ) {
        matrix[targetMatrixRow][targetMatrixCol] = 0;
      }
    }
    targetMatrixRow++;
  }

  if (shouldZeroFirstRow) {
    for (
      let fillFirstRowCol = 0;
      fillFirstRowCol < matrixColCount;
      fillFirstRowCol++
    ) {
      matrix[0][fillFirstRowCol] = 0;
    }
  }

  if (shouldZeroFirstColumn) {
    let fillFirstColRow = 0;
    while (fillFirstColRow < matrixRowCount) {
      matrix[fillFirstColRow][0] = 0;
      fillFirstColRow++;
    }
  }
};

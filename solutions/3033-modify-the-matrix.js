/**
 * Modify The Matrix
 * Intuition: Each -1 needs to be replaced by its column's maximum. Pre-calculating column maximums once and then iterating to fill in -1s is efficient.
 * Approach: 1. Determine matrix dimensions. 2. Create a deep copy of the input matrix for the result. 3. Initialize an array to store the maximum value for each column. 4. Iterate column by column through the original matrix to populate the column maximums array. 5. Iterate row by row through the result matrix, replacing any -1 with the corresponding pre-calculated column maximum. 6. Return the modified result matrix.
 * Dry Run: matrix = [[1,2,-1],[4,-1,6],[7,8,9]]
 *   mRows = 3, nCols = 3
 *   resultMatrix = [[1,2,-1],[4,-1,6],[7,8,9]]
 *   columnMaxValues = [-Infinity, -Infinity, -Infinity]
 *
 *   // First Pass: Calculate column maximums
 *   colIndex = 0: matrix[0][0]=1, matrix[1][0]=4, matrix[2][0]=7 => columnMaxValues[0] = 7
 *   colIndex = 1: matrix[0][1]=2, matrix[1][1]=-1, matrix[2][1]=8 => columnMaxValues[1] = 8
 *   colIndex = 2: matrix[0][2]=-1, matrix[1][2]=6, matrix[2][2]=9 => columnMaxValues[2] = 9
 *   columnMaxValues now is [7, 8, 9]
 *
 *   // Second Pass: Fill -1s in resultMatrix
 *   rowModifyIndex = 0:
 *     colModifyIndex = 0: resultMatrix[0][0]=1 (not -1)
 *     colModifyIndex = 1: resultMatrix[0][1]=2 (not -1)
 *     colModifyIndex = 2: resultMatrix[0][2]=-1. Replace with columnMaxValues[2] (9). resultMatrix[0][2] = 9
 *   rowModifyIndex = 1:
 *     colModifyIndex = 0: resultMatrix[1][0]=4 (not -1)
 *     colModifyIndex = 1: resultMatrix[1][1]=-1. Replace with columnMaxValues[1] (8). resultMatrix[1][1] = 8
 *     colModifyIndex = 2: resultMatrix[1][2]=6 (not -1)
 *   rowModifyIndex = 2:
 *     colModifyIndex = 0: resultMatrix[2][0]=7 (not -1)
 *     colModifyIndex = 1: resultMatrix[2][1]=8 (not -1)
 *     colModifyIndex = 2: resultMatrix[2][2]=9 (not -1)
 *
 *   Final resultMatrix = [[1,2,9],[4,8,6],[7,8,9]]
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var modifiedMatrix = function (matrix) {
  const mRows = matrix.length;
  const nCols = matrix[0].length;
  const resultMatrix = matrix.map((currentRow) => [...currentRow]);
  const columnMaxValues = new Array(nCols).fill(-Infinity);

  for (let colIndex = 0; colIndex < nCols; colIndex++) {
    for (let rowIndexValue = 0; rowIndexValue < mRows; rowIndexValue++) {
      columnMaxValues[colIndex] = Math.max(
        columnMaxValues[colIndex],
        matrix[rowIndexValue][colIndex]
      );
    }
  }

  for (let rowModifyIndex = 0; rowModifyIndex < mRows; rowModifyIndex++) {
    for (let colModifyIndex = 0; colModifyIndex < nCols; colModifyIndex++) {
      if (resultMatrix[rowModifyIndex][colModifyIndex] === -1) {
        resultMatrix[rowModifyIndex][colModifyIndex] =
          columnMaxValues[colModifyIndex];
      }
    }
  }

  return resultMatrix;
};

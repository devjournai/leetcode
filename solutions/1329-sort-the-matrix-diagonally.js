/**
 * Sort The Matrix Diagonally
 * Intuition: Cells on the same diagonal share row-col. Collect, sort, write back.
 * Approach: 1. Group values by (row-col). 2. Sort each group ascending. 3. Replay the matrix and refill from those sorted lists. 4. Return mat.
 * Dry Run: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]. Diagonals sort in place toward [[1,1,1,1],[1,2,2,2],[1,2,3,3]].
 * Time Complexity: O(m * n * log(min(m, n)))
 * Space Complexity: O(m * n)
 */
var diagonalSort = function (mat) {
  const rowsCount = mat.length;
  const colsCount = mat[0].length;
  const diagonalValues = new Map();

  for (let scanRow = 0; scanRow < rowsCount; scanRow++) {
    for (let scanCol = 0; scanCol < colsCount; scanCol++) {
      const diagIndexKey = scanRow - scanCol;
      if (!diagonalValues.has(diagIndexKey)) {
        diagonalValues.set(diagIndexKey, []);
      }
      diagonalValues.get(diagIndexKey).push(mat[scanRow][scanCol]);
    }
  }

  diagonalValues.forEach((valueArray) => {
    valueArray.sort((aValue, bValue) => aValue - bValue);
  });

  const diagPointers = new Map();
  for (const keyIterator of diagonalValues.keys()) {
    diagPointers.set(keyIterator, 0);
  }

  for (let matrixRowIter = 0; matrixRowIter < rowsCount; matrixRowIter++) {
    for (let matrixColIter = 0; matrixColIter < colsCount; matrixColIter++) {
      const currentDiagID = matrixRowIter - matrixColIter;
      const pointerVal = diagPointers.get(currentDiagID);
      mat[matrixRowIter][matrixColIter] =
        diagonalValues.get(currentDiagID)[pointerVal];
      const nextIndex = pointerVal + 1;
      diagPointers.set(currentDiagID, nextIndex);
    }
  }

  return mat;
};

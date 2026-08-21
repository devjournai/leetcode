/**
 * Minimum Falling Path Sum
 * Intuition: A falling path only steps to col−1/col/col+1 on the next row, so the min to reach a cell is that cell plus the min of the three parents (edges miss a neighbor).
 * Approach: 1. n=1 → matrix[0][0]. 2. `lastRowMinima` = first row. 3. For each later row, build `thisRowMinima[col] = matrix + min(left,center,right)` with Infinity off-grid. 4. Return min of last row.
 * Dry Run: [[2,1,3],[6,5,4],[7,8,9]]. After row1: [7,6,5]. After row2: [13,13,14]. Min 13 (2→5→6? 1→5→7 or 1→4→8: 1+4+8=13).
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minFallingPathSum = function (matrix) {
  const gridSize = matrix.length;

  if (gridSize === 1) {
    return matrix[0][0];
  }

  let lastRowMinima = [...matrix[0]];

  let rowIter = 1;
  while (rowIter < gridSize) {
    const thisRowMinima = new Array(gridSize);
    const actualMatrixRow = matrix[rowIter];

    let colIter = 0;
    while (colIter < gridSize) {
      const leftOption = colIter > 0 ? lastRowMinima[colIter - 1] : Infinity;
      const centerOption = lastRowMinima[colIter];
      const rightOption =
        colIter < gridSize - 1 ? lastRowMinima[colIter + 1] : Infinity;

      thisRowMinima[colIter] =
        actualMatrixRow[colIter] +
        Math.min(leftOption, centerOption, rightOption);
      colIter++;
    }
    lastRowMinima = thisRowMinima;
    rowIter++;
  }

  const resultMinSum = Math.min(...lastRowMinima);
  return resultMinSum;
};

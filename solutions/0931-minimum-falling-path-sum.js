/**
 * Minimum Falling Path Sum
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

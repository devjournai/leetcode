/**
 * Count Submatrices with Top-Left Element and Sum Less Than k
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var countSubmatrices = function (grid, k) {
  const gridRowLength = grid.length;
  const gridColLength = grid[0].length;
  const cumulativeSumMatrix = Array.from({ length: gridRowLength + 1 }, () =>
    new Array(gridColLength + 1).fill(0),
  );

  for (let currentRow = 1; currentRow <= gridRowLength; currentRow++) {
    for (
      let currentColumn = 1;
      currentColumn <= gridColLength;
      currentColumn++
    ) {
      const gridElementValue = grid[currentRow - 1][currentColumn - 1];
      cumulativeSumMatrix[currentRow][currentColumn] =
        gridElementValue +
        cumulativeSumMatrix[currentRow - 1][currentColumn] +
        cumulativeSumMatrix[currentRow][currentColumn - 1] -
        cumulativeSumMatrix[currentRow - 1][currentColumn - 1];
    }
  }

  let submatrixCount = 0;
  for (let checkRow = 1; checkRow <= gridRowLength; checkRow++) {
    for (let checkColumn = 1; checkColumn <= gridColLength; checkColumn++) {
      const currentSubmatrixSum = cumulativeSumMatrix[checkRow][checkColumn];
      if (currentSubmatrixSum <= k) {
        submatrixCount++;
      }
    }
  }

  return submatrixCount;
};

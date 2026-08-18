/**
 * Right Triangles
 * Intuition: A right triangle with legs parallel to axes is formed by a 1 at the corner plus another 1 in its row and another in its column. For each 1, add (rowOnes-1)*(colOnes-1).
 * Approach: 1. Count 1s per row and column. 2. For each cell that is 1, add (rowCount-1)*(colCount-1). 3. Return the sum.
 * Dry Run:
 *   A plus-shaped 3x3 of 1s on the middle row/col: center contributes 2*2=4, each arm endpoint 1*2 or 2*1, total 8.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R + C)
 */
var numberOfRightTriangles = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  const onesPerRow = new Array(rowCount).fill(0);
  const onesPerColumn = new Array(columnCount).fill(0);
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      if (grid[rowIndex][columnIndex] === 1) {
        onesPerRow[rowIndex]++;
        onesPerColumn[columnIndex]++;
      }
    }
  }

  let triangleCount = 0;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      if (grid[rowIndex][columnIndex] === 1) {
        triangleCount +=
          (onesPerRow[rowIndex] - 1) * (onesPerColumn[columnIndex] - 1);
      }
    }
  }
  return triangleCount;
};

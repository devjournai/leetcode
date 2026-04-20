/**
 * Flip Square Submatrix Vertically
 * Time Complexity: O(k^2)
 * Space Complexity: O(1)
 */
var reverseSubmatrix = function (grid, x, y, k) {
  let topRow = x;
  let bottomRow = x + k - 1;

  while (topRow < bottomRow) {
    for (let col = y; col < y + k; col++) {
      let temp = grid[topRow][col];
      grid[topRow][col] = grid[bottomRow][col];
      grid[bottomRow][col] = temp;
    }
    topRow++;
    bottomRow--;
  }

  return grid;
};

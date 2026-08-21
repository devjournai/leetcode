/**
 * Flip Square Submatrix Vertically
 * Intuition: Vertical flip of a k×k block is swapping row x+t with row x+k-1-t for each column in [y, y+k).
 * Approach: 1. Set topRow = x and bottomRow = x+k-1. 2. While top < bottom, swap the k cells in those rows across columns y..y+k-1. 3. Return the mutated grid.
 * Dry Run: grid [[1, 2], [3, 4]], x=0, y=0, k=2. Swap row 0 with row 1 → [[3, 4], [1, 2]].
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

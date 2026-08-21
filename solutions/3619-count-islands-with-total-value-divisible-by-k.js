/**
 * Count Islands with Total Value Divisible by K
 * Intuition: Each 4-connected group of positive cells is an island; flood-fill its sum and count those divisible by k.
 * Approach: 1. DFS/BFS from every unvisited positive cell. 2. Zero out visited cells while summing. 3. Increment if sum % k === 0.
 * Dry Run: A 2-cell island summing to 6 with k = 3 counts 1.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var countIslands = function (grid, k) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [-1, 0, 1, 0, -1];

  const flood = (row, col) => {
    let total = grid[row][col];
    grid[row][col] = 0;
    for (let dir = 0; dir < 4; dir++) {
      const nextRow = row + directions[dir];
      const nextCol = col + directions[dir + 1];
      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        grid[nextRow][nextCol] > 0
      ) {
        total += flood(nextRow, nextCol);
      }
    }
    return total;
  };

  let islands = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] > 0 && flood(row, col) % k === 0) {
        islands++;
      }
    }
  }
  return islands;
};

/**
 * Maximum Difference Score In A Grid
 * Intuition: A path moving only right/down has score grid[end]-grid[start] plus intermediate telescoping, which simplifies to grid[c]-grid[a] for some a that can reach c. For each cell, max score ending there is grid[cell] - min value seen from the top-left reachable region (excluding itself as the min if we need at least one move).
 * Approach: 1. Let minSoFar[r][c] be the min of the prefix rectangle excluding the requirement we move. 2. For each cell, candidate = grid[r][c] - min of up/left mins. 3. Update min at cell as min(grid, up, left).
 * Dry Run: grid = [[9, 5, 7, 3], [8, 9, 6, 1], [6, 7, 14, 3], [2, 5, 3, 1]]
 * - Path score equals last - first. Cell 14 at (2, 2) is reached from min origin 5 at (0, 1), score 9.
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var maxScore = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  let maxDifference = -Infinity;
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      let minPrevious = Infinity;
      if (rowIndex > 0) {
        minPrevious = Math.min(minPrevious, grid[rowIndex - 1][columnIndex]);
      }
      if (columnIndex > 0) {
        minPrevious = Math.min(minPrevious, grid[rowIndex][columnIndex - 1]);
      }
      if (minPrevious !== Infinity) {
        maxDifference = Math.max(
          maxDifference,
          grid[rowIndex][columnIndex] - minPrevious
        );
        grid[rowIndex][columnIndex] = Math.min(
          grid[rowIndex][columnIndex],
          minPrevious
        );
      }
    }
  }
  return maxDifference;
};

/**
 * Count Servers That Communicate
 * Intuition: A server communicates if its row or column has another server. Count servers per row and column, then recount cells that sit on a row or col with tally > 1.
 * Approach: 1. First pass fills rowServerTracker and columnServerTracker. 2. Second pass counts grid 1s where row tally > 1 or col tally > 1.
 * Dry Run: grid = [[1,0],[1,1]]
 *   rows [1,2], cols [2,1]. All three 1s have row or col > 1. Return 3.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m + n)
 */
var countServers = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;

  const rowServerTracker = new Array(rowCount).fill(0);
  const columnServerTracker = new Array(columnCount).fill(0);

  for (let currentRowIndex = 0; currentRowIndex < rowCount; currentRowIndex++) {
    for (
      let currentColIndex = 0;
      currentColIndex < columnCount;
      currentColIndex++
    ) {
      if (grid[currentRowIndex][currentColIndex] === 1) {
        rowServerTracker[currentRowIndex]++;
        columnServerTracker[currentColIndex]++;
      }
    }
  }

  let communicationCount = 0;

  for (let scanRowIndex = 0; scanRowIndex < rowCount; scanRowIndex++) {
    for (let scanColIndex = 0; scanColIndex < columnCount; scanColIndex++) {
      if (grid[scanRowIndex][scanColIndex] === 1) {
        const currentServerRowTally = rowServerTracker[scanRowIndex];
        const currentServerColTally = columnServerTracker[scanColIndex];

        if (currentServerRowTally > 1 || currentServerColTally > 1) {
          communicationCount++;
        }
      }
    }
  }

  return communicationCount;
};

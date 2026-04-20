/**
 * Count Servers That Communicate
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

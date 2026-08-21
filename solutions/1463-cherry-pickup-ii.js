/**
 * Cherry Pickup II
 * Intuition: Two robots walk down together row by row. State is (row, col1, col2); cherries in a cell are collected once if both robots land there. Each robot may move -1/0/+1 column.
 * Approach: 1. Memo table [row][c1][c2]. 2. Recurse; out of bounds yields -Infinity. 3. Add grid[row][c1] plus grid[row][c2] if c1!=c2. 4. On last row return that; else try 9 move pairs and memoize. Start at (0,0,cols-1).
 * Dry Run: 3x3 grid with cherries in corners
 *   - robots start columns 0 and 2, walk down choosing columns
 *   - DP returns the sample maximum (e.g. 24 on the official 4-row example).
 * Time Complexity: O(rows * cols^2)
 * Space Complexity: O(rows * cols^2)
 */
var cherryPickup = function (inputGrid) {
  const totalRows = inputGrid.length;
  const totalColumns = inputGrid[0].length;

  const memoizationTable = new Array(totalRows).fill(null).map(() => {
    return new Array(totalColumns)
      .fill(null)
      .map(() => new Array(totalColumns).fill(-1));
  });

  const movementOffsets = [-1, 0, 1];

  function calculateMaxCherriesRecursive(
    currentRowIndex,
    robotOneColumn,
    robotTwoColumn
  ) {
    if (
      robotOneColumn < 0 ||
      robotOneColumn >= totalColumns ||
      robotTwoColumn < 0 ||
      robotTwoColumn >= totalColumns ||
      currentRowIndex === totalRows
    ) {
      return -Infinity;
    }

    if (
      memoizationTable[currentRowIndex][robotOneColumn][robotTwoColumn] !== -1
    ) {
      return memoizationTable[currentRowIndex][robotOneColumn][robotTwoColumn];
    }

    let currentPathCherries = inputGrid[currentRowIndex][robotOneColumn];
    if (robotOneColumn !== robotTwoColumn) {
      currentPathCherries += inputGrid[currentRowIndex][robotTwoColumn];
    }

    if (currentRowIndex === totalRows - 1) {
      return currentPathCherries;
    }

    let maximumFutureCherries = -Infinity;
    for (
      let firstRobotOffsetIndex = 0;
      firstRobotOffsetIndex < movementOffsets.length;
      firstRobotOffsetIndex++
    ) {
      const robotOneNextOffset = movementOffsets[firstRobotOffsetIndex];
      const nextColumnRobotOne = robotOneColumn + robotOneNextOffset;

      for (
        let secondRobotOffsetIndex = 0;
        secondRobotOffsetIndex < movementOffsets.length;
        secondRobotOffsetIndex++
      ) {
        const robotTwoNextOffset = movementOffsets[secondRobotOffsetIndex];
        const nextColumnRobotTwo = robotTwoColumn + robotTwoNextOffset;

        maximumFutureCherries = Math.max(
          maximumFutureCherries,
          calculateMaxCherriesRecursive(
            currentRowIndex + 1,
            nextColumnRobotOne,
            nextColumnRobotTwo
          )
        );
      }
    }

    memoizationTable[currentRowIndex][robotOneColumn][robotTwoColumn] =
      currentPathCherries + maximumFutureCherries;
    return memoizationTable[currentRowIndex][robotOneColumn][robotTwoColumn];
  }

  return Math.max(0, calculateMaxCherriesRecursive(0, 0, totalColumns - 1));
};

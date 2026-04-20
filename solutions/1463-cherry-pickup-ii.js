/**
 * Cherry Pickup II
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
    robotTwoColumn,
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
            nextColumnRobotTwo,
          ),
        );
      }
    }

    memoizationTable[currentRowIndex][robotOneColumn][robotTwoColumn] =
      currentPathCherries + maximumFutureCherries;
    return memoizationTable[currentRowIndex][robotOneColumn][robotTwoColumn];
  }

  return Math.max(0, calculateMaxCherriesRecursive(0, 0, totalColumns - 1));
};

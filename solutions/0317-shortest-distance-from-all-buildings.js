/**
 * Shortest Distance From All Buildings
 * Time Complexity: O((R * C)^2)
 * Space Complexity: O(R * C)
 */
var shortestDistance = function (grid) {
  const numRows = grid.length;
  const numColumns = grid[0].length;
  const totalDistances = new Array(numRows)
    .fill(null)
    .map(() => new Array(numColumns).fill(0));
  const reachableCounts = new Array(numRows)
    .fill(null)
    .map(() => new Array(numColumns).fill(0));
  let totalBuildingsFound = 0;

  function traverseFromBuilding(startRowPosition, startColPosition) {
    const bfsQueue = [[startRowPosition, startColPosition]];
    const visitedCells = new Array(numRows)
      .fill(null)
      .map(() => new Array(numColumns).fill(false));
    visitedCells[startRowPosition][startColPosition] = true;
    let currentTravelDistance = 0;

    const movementDirections = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (bfsQueue.length > 0) {
      const queueLevelSize = bfsQueue.length;
      currentTravelDistance++;
      for (let cellIndex = 0; cellIndex < queueLevelSize; ++cellIndex) {
        const [currentRowCell, currentColCell] = bfsQueue.shift();
        for (const [deltaR, deltaC] of movementDirections) {
          const nextRowCoord = currentRowCell + deltaR;
          const nextColCoord = currentColCell + deltaC;

          if (
            nextRowCoord >= 0 &&
            nextRowCoord < numRows &&
            nextColCoord >= 0 &&
            nextColCoord < numColumns &&
            !visitedCells[nextRowCoord][nextColCoord] &&
            grid[nextRowCoord][nextColCoord] === 0
          ) {
            bfsQueue.push([nextRowCoord, nextColCoord]);
            visitedCells[nextRowCoord][nextColCoord] = true;
            totalDistances[nextRowCoord][nextColCoord] += currentTravelDistance;
            reachableCounts[nextRowCoord][nextColCoord]++;
          }
        }
      }
    }
  }

  for (let rowIterator = 0; rowIterator < numRows; ++rowIterator) {
    for (let colIterator = 0; colIterator < numColumns; ++colIterator) {
      if (grid[rowIterator][colIterator] === 1) {
        totalBuildingsFound++;
        traverseFromBuilding(rowIterator, colIterator);
      }
    }
  }

  let minimumOverallDistance = Infinity;
  for (let rIndex = 0; rIndex < numRows; ++rIndex) {
    for (let cIndex = 0; cIndex < numColumns; ++cIndex) {
      if (
        grid[rIndex][cIndex] === 0 &&
        reachableCounts[rIndex][cIndex] === totalBuildingsFound
      ) {
        minimumOverallDistance = Math.min(
          minimumOverallDistance,
          totalDistances[rIndex][cIndex],
        );
      }
    }
  }

  return minimumOverallDistance === Infinity ? -1 : minimumOverallDistance;
};

/**
 * Shortest Distance From All Buildings
 * Intuition: Empty land that can reach every building has the sum of BFS distances from all buildings. BFS from each building onto 0-cells, then pick the empty cell with full reachability and smallest total.
 * Approach: 1. For each cell with value 1, BFS through 0-cells, adding the level distance into totalDistances and incrementing reachableCounts. 2. Count buildings. 3. Scan 0-cells whose reachableCounts equals the building count; track the min totalDistances. 4. Return that min, or -1 if none.
 * Dry Run: grid = [[1, 0], [0, 0]] (one building at [0][0]).
 *   - BFS marks [0][1] dist 1 and [1][0] dist 1, then [1][1] dist 2.
 *   - All empty cells reach the one building; min is 1.
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
          totalDistances[rIndex][cIndex]
        );
      }
    }
  }

  return minimumOverallDistance === Infinity ? -1 : minimumOverallDistance;
};

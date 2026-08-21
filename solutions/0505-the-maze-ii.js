/**
 * The Maze II
 * Intuition: The ball rolls until it hits a wall, so each BFS node is a stop cell, not a single step. Track the shortest distance to every stop and only enqueue when a roll improves it.
 * Approach: 1. `minTravelDistances` starts at infinity except start=0. 2. Queue `[row, col, dist]`. 3. From each cell roll in four directions until the next cell is out of bounds or a wall; if the new path is shorter, update and enqueue. 4. Destination is -1 if still infinity.
 * Dry Run: 3x3 empty maze, start [0,0], dest [0,2].
 *   - Roll right from (0,0) to (0,2) in 2 steps; that distance is stored. Later worse paths skip. Return 2.
 * Time Complexity: O(R * C * (R + C))
 * Space Complexity: O(R * C)
 */
var shortestDistance = function (mazeInput, startPoint, destinationPoint) {
  const gridRows = mazeInput.length;
  const gridCols = mazeInput[0].length;
  const minTravelDistances = new Array(gridRows)
    .fill()
    .map(() => new Array(gridCols).fill(Number.MAX_SAFE_INTEGER));
  const directionDelta = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const searchFrontier = [[startPoint[0], startPoint[1], 0]];
  minTravelDistances[startPoint[0]][startPoint[1]] = 0;

  while (searchFrontier.length > 0) {
    const currentCoordinate = searchFrontier.shift();
    const currentRowPos = currentCoordinate[0];
    const currentColPos = currentCoordinate[1];
    const accumulatedDistance = currentCoordinate[2];

    if (
      accumulatedDistance > minTravelDistances[currentRowPos][currentColPos]
    ) {
      continue;
    }

    for (
      let directionIdx = 0;
      directionIdx < directionDelta.length;
      directionIdx++
    ) {
      const deltaRow = directionDelta[directionIdx][0];
      const deltaCol = directionDelta[directionIdx][1];
      let rollingPositionRow = currentRowPos;
      let rollingPositionCol = currentColPos;
      let pathLength = 0;

      while (true) {
        const nextTestRow = rollingPositionRow + deltaRow;
        const nextTestCol = rollingPositionCol + deltaCol;

        if (
          nextTestRow < 0 ||
          nextTestRow >= gridRows ||
          nextTestCol < 0 ||
          nextTestCol >= gridCols ||
          mazeInput[nextTestRow][nextTestCol] === 1
        ) {
          break;
        }

        rollingPositionRow = nextTestRow;
        rollingPositionCol = nextTestCol;
        pathLength++;
      }

      const newTotalPath = accumulatedDistance + pathLength;

      if (
        newTotalPath <
        minTravelDistances[rollingPositionRow][rollingPositionCol]
      ) {
        minTravelDistances[rollingPositionRow][rollingPositionCol] =
          newTotalPath;
        searchFrontier.push([
          rollingPositionRow,
          rollingPositionCol,
          newTotalPath,
        ]);
      }
    }
  }

  const finalDestinationRow = destinationPoint[0];
  const finalDestinationCol = destinationPoint[1];
  const computedOutcome =
    minTravelDistances[finalDestinationRow][finalDestinationCol];

  return computedOutcome === Number.MAX_SAFE_INTEGER ? -1 : computedOutcome;
};

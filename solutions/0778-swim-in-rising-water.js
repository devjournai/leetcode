/**
 * Swim In Rising Water
 * Intuition: The wait time is the min t such that a 4-direction path from (0,0) to (n-1,n-1) uses only cells `<= t`. Binary-search t and BFS to test connectivity.
 * Approach: 1. Low = `gridMap[0][0]`, high = n*n-1. 2. `checkPathAvailability(threshold)`: if start > threshold fail; BFS from (0,0) over `adjacentCellOffsets`, visiting cells with elevation ≤ threshold. 3. If a path exists, shrink `binarySearchUpperBound` to mid; else raise lower bound. Return `binarySearchLowerBound`.
 * Dry Run: gridMap = [[0,2],[1,3]].
 *   - t=0: only (0,0). t=1: (0,0)-(1,0) cannot reach (1,1) (3>1). t=3: all cells reachable. Return 3.
 * Time Complexity: O(N*N * log(N*N))
 * Space Complexity: O(N*N)
 */
var swimInWater = function (gridMap) {
  const gridDimensionValue = gridMap.length;
  let binarySearchLowerBound = gridMap[0][0];
  let binarySearchUpperBound = gridDimensionValue * gridDimensionValue - 1;

  const adjacentCellOffsets = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const checkPathAvailability = (currentWaterThreshold) => {
    if (gridMap[0][0] > currentWaterThreshold) {
      return false;
    }

    const visitedStatusGrid = [];
    for (
      let rowInitializerIndex = 0;
      rowInitializerIndex < gridDimensionValue;
      rowInitializerIndex++
    ) {
      const rowVisibilityList = [];
      for (
        let colInitializerIndex = 0;
        colInitializerIndex < gridDimensionValue;
        colInitializerIndex++
      ) {
        rowVisibilityList.push(false);
      }
      visitedStatusGrid.push(rowVisibilityList);
    }

    const bfsExplorationQueue = [[0, 0]];
    visitedStatusGrid[0][0] = true;

    let queueReadPointer = 0;
    while (queueReadPointer < bfsExplorationQueue.length) {
      const currentTraversalCoordinates = bfsExplorationQueue[queueReadPointer];
      queueReadPointer++;
      const currentTraversalRow = currentTraversalCoordinates[0];
      const currentTraversalCol = currentTraversalCoordinates[1];

      if (
        currentTraversalRow === gridDimensionValue - 1 &&
        currentTraversalCol === gridDimensionValue - 1
      ) {
        return true;
      }

      for (
        let directionIteratorIndex = 0;
        directionIteratorIndex < adjacentCellOffsets.length;
        directionIteratorIndex++
      ) {
        const currentOffsetPair = adjacentCellOffsets[directionIteratorIndex];
        const rowMovement = currentOffsetPair[0];
        const colMovement = currentOffsetPair[1];

        const nextPotentialRow = currentTraversalRow + rowMovement;
        const nextPotentialCol = currentTraversalCol + colMovement;

        const isNextRowWithinBounds =
          nextPotentialRow >= 0 && nextPotentialRow < gridDimensionValue;
        const isNextColWithinBounds =
          nextPotentialCol >= 0 && nextPotentialCol < gridDimensionValue;

        if (isNextRowWithinBounds && isNextColWithinBounds) {
          const hasNextCellBeenVisited =
            visitedStatusGrid[nextPotentialRow][nextPotentialCol];
          const nextCellElevation = gridMap[nextPotentialRow][nextPotentialCol];
          const isElevationPermissible =
            nextCellElevation <= currentWaterThreshold;

          if (!hasNextCellBeenVisited && isElevationPermissible) {
            bfsExplorationQueue.push([nextPotentialRow, nextPotentialCol]);
            visitedStatusGrid[nextPotentialRow][nextPotentialCol] = true;
          }
        }
      }
    }
    return false;
  };

  while (binarySearchLowerBound < binarySearchUpperBound) {
    const testTimeMidpoint = Math.floor(
      (binarySearchLowerBound + binarySearchUpperBound) / 2
    );

    if (checkPathAvailability(testTimeMidpoint)) {
      binarySearchUpperBound = testTimeMidpoint;
    } else {
      binarySearchLowerBound = testTimeMidpoint + 1;
    }
  }

  return binarySearchLowerBound;
};

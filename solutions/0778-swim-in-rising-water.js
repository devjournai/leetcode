/**
 * Swim In Rising Water
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
      (binarySearchLowerBound + binarySearchUpperBound) / 2,
    );

    if (checkPathAvailability(testTimeMidpoint)) {
      binarySearchUpperBound = testTimeMidpoint;
    } else {
      binarySearchLowerBound = testTimeMidpoint + 1;
    }
  }

  return binarySearchLowerBound;
};

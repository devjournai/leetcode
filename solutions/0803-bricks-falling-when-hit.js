/**
 * Bricks Falling When Hit
 * Time Complexity: O(R * C + H)
 * Space Complexity: O(R * C + H)
 */
var hitBricks = function (grid, hits) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;
  const movesArray = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const fallCounts = new Array(hits.length).fill(0);

  let hitIdx = 0;
  while (hitIdx < hits.length) {
    const currentHitCoord = hits[hitIdx];
    const hitGridRow = currentHitCoord[0];
    const hitGridCol = currentHitCoord[1];
    if (grid[hitGridRow][hitGridCol] === 1) {
      grid[hitGridRow][hitGridCol] = 2;
    }
    hitIdx++;
  }

  let columnIterator = 0;
  while (columnIterator < gridCols) {
    markInitialStableBricks(
      0,
      columnIterator,
      grid,
      gridRows,
      gridCols,
      movesArray,
    );
    columnIterator++;
  }

  let revertHitIndex = hits.length - 1;
  while (revertHitIndex >= 0) {
    const currentImpactCoords = hits[revertHitIndex];
    const impactRow = currentImpactCoords[0];
    const impactCol = currentImpactCoords[1];

    if (grid[impactRow][impactCol] !== 2) {
      revertHitIndex--;
      continue;
    }

    grid[impactRow][impactCol] = 1;

    if (
      isBrickStable(impactRow, impactCol, grid, gridRows, gridCols, movesArray)
    ) {
      const newlyStabilizedBricks = countConnectedStable(
        impactRow,
        impactCol,
        grid,
        gridRows,
        gridCols,
        movesArray,
      );
      fallCounts[revertHitIndex] = newlyStabilizedBricks - 1;
    }
    revertHitIndex--;
  }

  return fallCounts;

  function markInitialStableBricks(
    rowPosition,
    colPosition,
    currentGridState,
    totalRows,
    totalCols,
    directionsSet,
  ) {
    if (
      rowPosition < 0 ||
      rowPosition >= totalRows ||
      colPosition < 0 ||
      colPosition >= totalCols ||
      currentGridState[rowPosition][colPosition] !== 1
    ) {
      return 0;
    }

    currentGridState[rowPosition][colPosition] = 3;
    let componentSize = 1;

    for (let directionVector of directionsSet) {
      const nextRowPos = rowPosition + directionVector[0];
      const nextColPos = colPosition + directionVector[1];
      componentSize += markInitialStableBricks(
        nextRowPos,
        nextColPos,
        currentGridState,
        totalRows,
        totalCols,
        directionsSet,
      );
    }
    return componentSize;
  }

  function isBrickStable(
    checkRow,
    checkCol,
    currentGridState,
    totalRows,
    totalCols,
    directionsSet,
  ) {
    if (checkRow === 0) {
      return true;
    }

    for (let searchDirection of directionsSet) {
      const neighbourRow = checkRow + searchDirection[0];
      const neighbourCol = checkCol + searchDirection[1];

      if (
        neighbourRow >= 0 &&
        neighbourRow < totalRows &&
        neighbourCol >= 0 &&
        neighbourCol < totalCols &&
        currentGridState[neighbourRow][neighbourCol] === 3
      ) {
        return true;
      }
    }
    return false;
  }

  function countConnectedStable(
    startRow,
    startCol,
    currentGridState,
    totalRows,
    totalCols,
    directionsSet,
  ) {
    if (
      startRow < 0 ||
      startRow >= totalRows ||
      startCol < 0 ||
      startCol >= totalCols ||
      currentGridState[startRow][startCol] !== 1
    ) {
      return 0;
    }

    currentGridState[startRow][startCol] = 3;
    let stableBrickCount = 1;

    let directionIndex = 0;
    while (directionIndex < directionsSet.length) {
      const adjacentRow = startRow + directionsSet[directionIndex][0];
      const adjacentCol = startCol + directionsSet[directionIndex][1];
      stableBrickCount += countConnectedStable(
        adjacentRow,
        adjacentCol,
        currentGridState,
        totalRows,
        totalCols,
        directionsSet,
      );
      directionIndex++;
    }
    return stableBrickCount;
  }
};

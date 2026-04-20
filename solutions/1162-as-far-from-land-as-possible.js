/**
 * As Far From Land As Possible
 * Time Complexity: O(N*M)
 * Space Complexity: O(N*M)
 */
var maxDistance = function (grid) {
  const gridDimension = grid.length;
  const bfsContainer = [];
  let totalWaterCells = 0;

  let currentIteratorRow = 0;
  while (currentIteratorRow < gridDimension) {
    let currentIteratorCol = 0;
    while (currentIteratorCol < gridDimension) {
      if (grid[currentIteratorRow][currentIteratorCol] === 1) {
        bfsContainer.push([currentIteratorRow, currentIteratorCol]);
      } else {
        totalWaterCells++;
      }
      currentIteratorCol++;
    }
    currentIteratorRow++;
  }

  if (totalWaterCells === 0 || bfsContainer.length === 0) {
    return -1;
  }

  const movementVectors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let calculatedMaximumDistance = -1;

  while (bfsContainer.length > 0) {
    calculatedMaximumDistance++;
    const currentLevelNodesCount = bfsContainer.length;

    for (let nodeIndex = 0; nodeIndex < currentLevelNodesCount; nodeIndex++) {
      const currentCellCoords = bfsContainer.shift();
      const originRow = currentCellCoords[0];
      const originCol = currentCellCoords[1];

      movementVectors.forEach((individualVector) => {
        const rowDisplacement = individualVector[0];
        const colDisplacement = individualVector[1];

        const nextRowPosition = originRow + rowDisplacement;
        const nextColPosition = originCol + colDisplacement;

        if (
          nextRowPosition >= 0 &&
          nextRowPosition < gridDimension &&
          nextColPosition >= 0 &&
          nextColPosition < gridDimension &&
          grid[nextRowPosition][nextColPosition] === 0
        ) {
          grid[nextRowPosition][nextColPosition] = 1;
          bfsContainer.push([nextRowPosition, nextColPosition]);
        }
      });
    }
  }

  return calculatedMaximumDistance === 0 ? -1 : calculatedMaximumDistance;
};

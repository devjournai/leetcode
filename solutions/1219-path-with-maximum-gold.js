/**
 * Path With Maximum Gold
 * Time Complexity: O(R * C * 3^(R * C))
 * Space Complexity: O(R * C)
 */
var getMaximumGold = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;
  let maximumCollectedGold = 0;

  const rowDelta = [-1, 1, 0, 0];
  const colDelta = [0, 0, -1, 1];

  function explorePath(
    currentRowPosition,
    currentColPosition,
    currentPathTotalGold,
  ) {
    if (
      currentRowPosition < 0 ||
      currentRowPosition >= gridRows ||
      currentColPosition < 0 ||
      currentColPosition >= gridCols ||
      grid[currentRowPosition][currentColPosition] === 0
    ) {
      maximumCollectedGold = Math.max(
        maximumCollectedGold,
        currentPathTotalGold,
      );
      return;
    }

    const goldInCurrentCell = grid[currentRowPosition][currentColPosition];
    grid[currentRowPosition][currentColPosition] = 0;

    for (
      let moveDirectionIndex = 0;
      moveDirectionIndex < 4;
      moveDirectionIndex++
    ) {
      const nextRowCoordinate =
        currentRowPosition + rowDelta[moveDirectionIndex];
      const nextColCoordinate =
        currentColPosition + colDelta[moveDirectionIndex];
      explorePath(
        nextRowCoordinate,
        nextColCoordinate,
        currentPathTotalGold + goldInCurrentCell,
      );
    }

    grid[currentRowPosition][currentColPosition] = goldInCurrentCell;
  }

  for (let initialRow = 0; initialRow < gridRows; initialRow++) {
    for (let initialCol = 0; initialCol < gridCols; initialCol++) {
      if (grid[initialRow][initialCol] !== 0) {
        explorePath(initialRow, initialCol, 0);
      }
    }
  }

  return maximumCollectedGold;
};

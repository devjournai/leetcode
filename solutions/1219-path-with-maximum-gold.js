/**
 * Path With Maximum Gold
 * Intuition: Gold cells form a grid graph with no revisits; DFS from every gold cell with in-place marking finds the richest simple path.
 * Approach: 1. From each nonzero cell, DFS: take gold, zero the cell, recurse 4-ways, restore. 2. When a move is invalid, update the global max with the path sum so far.
 * Dry Run: grid=[[0,6,0],[5,8,7],[0,9,0]]. Path 6-8-7 or 6-8-9; best 24 (9-8-7).
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
    currentPathTotalGold
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
        currentPathTotalGold
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
        currentPathTotalGold + goldInCurrentCell
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

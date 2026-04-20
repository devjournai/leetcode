/**
 * Number Of Closed Islands
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var closedIsland = function (grid) {
  const totalRows = grid.length;
  const totalColumns = grid[0].length;
  let finalClosedIslandCount = 0;

  const rowDelta = [-1, 1, 0, 0];
  const colDelta = [0, 0, -1, 1];

  function findAndMarkIsland(currentGridRow, currentGridCol) {
    if (
      currentGridRow < 0 ||
      currentGridRow >= totalRows ||
      currentGridCol < 0 ||
      currentGridCol >= totalColumns
    ) {
      return false;
    }

    if (grid[currentGridRow][currentGridCol] === 1) {
      return true;
    }

    grid[currentGridRow][currentGridCol] = 1;

    let currentIslandIsClosed = true;

    currentIslandIsClosed =
      findAndMarkIsland(
        currentGridRow + rowDelta[0],
        currentGridCol + colDelta[0],
      ) && currentIslandIsClosed;
    currentIslandIsClosed =
      findAndMarkIsland(
        currentGridRow + rowDelta[1],
        currentGridCol + colDelta[1],
      ) && currentIslandIsClosed;
    currentIslandIsClosed =
      findAndMarkIsland(
        currentGridRow + rowDelta[2],
        currentGridCol + colDelta[2],
      ) && currentIslandIsClosed;
    currentIslandIsClosed =
      findAndMarkIsland(
        currentGridRow + rowDelta[3],
        currentGridCol + colDelta[3],
      ) && currentIslandIsClosed;

    return currentIslandIsClosed;
  }

  for (
    let gridTraverseRow = 0;
    gridTraverseRow < totalRows;
    gridTraverseRow++
  ) {
    for (
      let gridTraverseCol = 0;
      gridTraverseCol < totalColumns;
      gridTraverseCol++
    ) {
      if (grid[gridTraverseRow][gridTraverseCol] === 0) {
        if (findAndMarkIsland(gridTraverseRow, gridTraverseCol)) {
          finalClosedIslandCount++;
        }
      }
    }
  }

  return finalClosedIslandCount;
};

/**
 * Number Of Enclaves
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var numEnclaves = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;

  const depthFirstSearch = (rowCoordinate, colCoordinate) => {
    if (
      rowCoordinate < 0 ||
      rowCoordinate >= rowCount ||
      colCoordinate < 0 ||
      colCoordinate >= columnCount ||
      grid[rowCoordinate][colCoordinate] !== 1
    ) {
      return;
    }

    grid[rowCoordinate][colCoordinate] = 0;

    depthFirstSearch(rowCoordinate + 1, colCoordinate);
    depthFirstSearch(rowCoordinate - 1, colCoordinate);
    depthFirstSearch(rowCoordinate, colCoordinate + 1);
    depthFirstSearch(rowCoordinate, colCoordinate - 1);
  };

  for (let rowIterator = 0; rowIterator < rowCount; rowIterator++) {
    depthFirstSearch(rowIterator, 0);
    depthFirstSearch(rowIterator, columnCount - 1);
  }

  for (let columnIterator = 0; columnIterator < columnCount; columnIterator++) {
    depthFirstSearch(0, columnIterator);
    depthFirstSearch(rowCount - 1, columnIterator);
  }

  let totalEnclaves = 0;
  for (let currentRowIndex = 0; currentRowIndex < rowCount; currentRowIndex++) {
    for (
      let currentColIndex = 0;
      currentColIndex < columnCount;
      currentColIndex++
    ) {
      if (grid[currentRowIndex][currentColIndex] === 1) {
        totalEnclaves++;
      }
    }
  }

  return totalEnclaves;
};

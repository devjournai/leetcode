/**
 * Regions Cut By Slashes
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var regionsBySlashes = function (grid) {
  const gridLength = grid.length;
  const expandedGridSide = gridLength * 3;
  const processedMap = new Array(expandedGridSide)
    .fill(0)
    .map(() => new Array(expandedGridSide).fill(0));

  for (let inputRowIndex = 0; inputRowIndex < gridLength; inputRowIndex++) {
    for (
      let inputColumnIndex = 0;
      inputColumnIndex < gridLength;
      inputColumnIndex++
    ) {
      const baseOutputRow = inputRowIndex * 3;
      const baseOutputColumn = inputColumnIndex * 3;
      if (grid[inputRowIndex][inputColumnIndex] === "/") {
        processedMap[baseOutputRow][baseOutputColumn + 2] = 1;
        processedMap[baseOutputRow + 1][baseOutputColumn + 1] = 1;
        processedMap[baseOutputRow + 2][baseOutputColumn] = 1;
      } else if (grid[inputRowIndex][inputColumnIndex] === "\\") {
        processedMap[baseOutputRow][baseOutputColumn] = 1;
        processedMap[baseOutputRow + 1][baseOutputColumn + 1] = 1;
        processedMap[baseOutputRow + 2][baseOutputColumn + 2] = 1;
      }
    }
  }

  let regionCounter = 0;

  for (let scanRowIndex = 0; scanRowIndex < expandedGridSide; scanRowIndex++) {
    for (
      let scanColumnIndex = 0;
      scanColumnIndex < expandedGridSide;
      scanColumnIndex++
    ) {
      if (processedMap[scanRowIndex][scanColumnIndex] === 0) {
        exploreComponents(scanRowIndex, scanColumnIndex);
        regionCounter++;
      }
    }
  }

  return regionCounter;

  function exploreComponents(exploreRow, exploreColumn) {
    if (
      exploreRow < 0 ||
      exploreRow >= expandedGridSide ||
      exploreColumn < 0 ||
      exploreColumn >= expandedGridSide ||
      processedMap[exploreRow][exploreColumn] !== 0
    ) {
      return;
    }
    processedMap[exploreRow][exploreColumn] = 1;
    exploreComponents(exploreRow + 1, exploreColumn);
    exploreComponents(exploreRow - 1, exploreColumn);
    exploreComponents(exploreRow, exploreColumn + 1);
    exploreComponents(exploreRow, exploreColumn - 1);
  }
};

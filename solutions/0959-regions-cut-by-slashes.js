/**
 * Regions Cut By Slashes
 * Intuition: Scale each cell to a 3×3 block so `/` and `\\` become walls, then count 4-connected empty regions with DFS.
 * Approach: 1. Build `processedMap` of size `3N`. 2. Paint `/` on the anti-diagonal of each 3×3 and `\\` on the main diagonal. 3. Scan zeros, each time `exploreComponents` floods and increment `regionCounter`. 4. Return the count.
 * Dry Run: grid = [" /","/ "]. Two slashes form an X in the 6×6 map, splitting empty cells into 2 regions. Answer 2.
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

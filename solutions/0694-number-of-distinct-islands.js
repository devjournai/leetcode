/**
 * Number Of Distinct Islands
 * Intuition: Two islands are the same shape if their cells share the same offsets from the island’s first cell. Canonicalize each DFS path as a string of relative (r,c) pairs.
 * Approach: 1. Scan the grid; on unvisited 1, DFS `exploreIsland` recording `"relR,relC"` from the start cell. 2. Join coords with ";" into `collectedIslandShapes` Set. 3. Return set size. DFS marks visited and recurses 4-dir.
 * Dry Run: grid=[[1,1,0],[0,0,0],[0,1,1]]. DFS from (0,0) records "0,0;0,1" (right). DFS from (2,1) records "0,0;0,1". Set size 1.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var numDistinctIslands = function (inputGrid) {
  const totalRows = inputGrid.length;
  const totalColumns = inputGrid[0].length;

  const visitedGridCells = Array.from({ length: totalRows }, () =>
    new Array(totalColumns).fill(false)
  );
  const collectedIslandShapes = new Set();

  for (let gridRowIndex = 0; gridRowIndex < totalRows; gridRowIndex++) {
    for (
      let gridColumnIndex = 0;
      gridColumnIndex < totalColumns;
      gridColumnIndex++
    ) {
      if (
        inputGrid[gridRowIndex][gridColumnIndex] === 1 &&
        !visitedGridCells[gridRowIndex][gridColumnIndex]
      ) {
        const currentIslandCoordinates = [];
        exploreIsland(
          gridRowIndex,
          gridColumnIndex,
          gridRowIndex,
          gridColumnIndex,
          currentIslandCoordinates
        );
        collectedIslandShapes.add(currentIslandCoordinates.join(";"));
      }
    }
  }

  return collectedIslandShapes.size;

  function exploreIsland(
    currentRowCoord,
    currentColCoord,
    startRowCoord,
    startColCoord,
    islandPathRecorder
  ) {
    if (
      currentRowCoord < 0 ||
      currentRowCoord >= totalRows ||
      currentColCoord < 0 ||
      currentColCoord >= totalColumns ||
      visitedGridCells[currentRowCoord][currentColCoord] ||
      inputGrid[currentRowCoord][currentColCoord] === 0
    ) {
      return;
    }

    visitedGridCells[currentRowCoord][currentColCoord] = true;
    const relativeRowOffset = currentRowCoord - startRowCoord;
    const relativeColOffset = currentColCoord - startColCoord;
    islandPathRecorder.push(`${relativeRowOffset},${relativeColOffset}`);

    exploreIsland(
      currentRowCoord + 1,
      currentColCoord,
      startRowCoord,
      startColCoord,
      islandPathRecorder
    );
    exploreIsland(
      currentRowCoord - 1,
      currentColCoord,
      startRowCoord,
      startColCoord,
      islandPathRecorder
    );
    exploreIsland(
      currentRowCoord,
      currentColCoord + 1,
      startRowCoord,
      startColCoord,
      islandPathRecorder
    );
    exploreIsland(
      currentRowCoord,
      currentColCoord - 1,
      startRowCoord,
      startColCoord,
      islandPathRecorder
    );
  }
};

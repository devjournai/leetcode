/**
 * Pacific Atlantic Water Flow
 * Intuition: Water flows to an ocean along nondecreasing heights, so reverse-DFS from each ocean’s border: visit neighbors with `height >= current`. Cells marked in both `pacificReachableCells` and `atlanticReachableCells` are answers.
 * Approach: 1. DFS from left/top into Pacific marks; from right/bottom into Atlantic. 2. `exploreOceanFlow` skips already marked cells and walks 4 directions uphill. 3. Collect coordinates true in both grids.
 * Dry Run: typical 5×5 heights example: Pacific from (0,*) and (*,0), Atlantic from last row/col; intersection includes [0,4], [1,3], [3,1], [4,0], etc.
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(rows * columns)
 */
var pacificAtlantic = function (heights) {
  const totalRows = heights.length;
  const totalColumns = heights[0].length;
  const waterFlowResult = [];

  const pacificReachableCells = Array.from({ length: totalRows }, () =>
    Array(totalColumns).fill(false)
  );
  const atlanticReachableCells = Array.from({ length: totalRows }, () =>
    Array(totalColumns).fill(false)
  );

  function exploreOceanFlow(
    currentRow,
    currentColumn,
    gridHeights,
    oceanPathGrid
  ) {
    if (oceanPathGrid[currentRow][currentColumn]) {
      return;
    }
    oceanPathGrid[currentRow][currentColumn] = true;

    const directionVectors = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    const numberOfDirections = directionVectors.length;
    let directionIndexTracker = 0;
    while (directionIndexTracker < numberOfDirections) {
      const currentDirectionVector = directionVectors[directionIndexTracker];
      const nextRowCoordinate = currentRow + currentDirectionVector[0];
      const nextColumnCoordinate = currentColumn + currentDirectionVector[1];

      const isRowValid =
        nextRowCoordinate >= 0 && nextRowCoordinate < totalRows;
      const isColumnValid =
        nextColumnCoordinate >= 0 && nextColumnCoordinate < totalColumns;

      if (
        isRowValid &&
        isColumnValid &&
        gridHeights[nextRowCoordinate][nextColumnCoordinate] >=
          gridHeights[currentRow][currentColumn]
      ) {
        exploreOceanFlow(
          nextRowCoordinate,
          nextColumnCoordinate,
          gridHeights,
          oceanPathGrid
        );
      }
      directionIndexTracker++;
    }
  }

  let pacificRowBorderIndex = 0;
  while (pacificRowBorderIndex < totalRows) {
    exploreOceanFlow(pacificRowBorderIndex, 0, heights, pacificReachableCells);
    pacificRowBorderIndex++;
  }

  let pacificColumnBorderIndex = 0;
  while (pacificColumnBorderIndex < totalColumns) {
    exploreOceanFlow(
      0,
      pacificColumnBorderIndex,
      heights,
      pacificReachableCells
    );
    pacificColumnBorderIndex++;
  }

  let atlanticRowBorderIndex = 0;
  while (atlanticRowBorderIndex < totalRows) {
    exploreOceanFlow(
      atlanticRowBorderIndex,
      totalColumns - 1,
      heights,
      atlanticReachableCells
    );
    atlanticRowBorderIndex++;
  }

  let atlanticColumnBorderIndex = 0;
  while (atlanticColumnBorderIndex < totalColumns) {
    exploreOceanFlow(
      totalRows - 1,
      atlanticColumnBorderIndex,
      heights,
      atlanticReachableCells
    );
    atlanticColumnBorderIndex++;
  }

  let finalRowIterator = 0;
  while (finalRowIterator < totalRows) {
    let finalColumnIterator = 0;
    while (finalColumnIterator < totalColumns) {
      if (
        pacificReachableCells[finalRowIterator][finalColumnIterator] &&
        atlanticReachableCells[finalRowIterator][finalColumnIterator]
      ) {
        waterFlowResult.push([finalRowIterator, finalColumnIterator]);
      }
      finalColumnIterator++;
    }
    finalRowIterator++;
  }

  return waterFlowResult;
};

/**
 * Minimum Number Of Days To Disconnect Island
 * Time Complexity: O((R * C)^2)
 * Space Complexity: O(R * C)
 */
var minDays = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  const obtainIslandCount = () => {
    let islandNumberTally = 0;
    const visitedGridCells = Array(gridRows)
      .fill()
      .map(() => Array(gridCols).fill(false));

    const exploreIslandComponent = (startRow, startCol) => {
      if (
        startRow < 0 ||
        startRow >= gridRows ||
        startCol < 0 ||
        startCol >= gridCols ||
        visitedGridCells[startRow][startCol] ||
        grid[startRow][startCol] === 0
      ) {
        return;
      }

      visitedGridCells[startRow][startCol] = true;

      exploreIslandComponent(startRow + 1, startCol);
      exploreIslandComponent(startRow - 1, startCol);
      exploreIslandComponent(startRow, startCol + 1);
      exploreIslandComponent(startRow, startCol - 1);
    };

    for (let rowIteratorTwo = 0; rowIteratorTwo < gridRows; rowIteratorTwo++) {
      for (
        let colIteratorTwo = 0;
        colIteratorTwo < gridCols;
        colIteratorTwo++
      ) {
        if (
          grid[rowIteratorTwo][colIteratorTwo] === 1 &&
          !visitedGridCells[rowIteratorTwo][colIteratorTwo]
        ) {
          islandNumberTally++;
          exploreIslandComponent(rowIteratorTwo, colIteratorTwo);
        }
      }
    }
    return islandNumberTally;
  };

  let presentIslandStatus = obtainIslandCount();
  if (presentIslandStatus !== 1) {
    return 0;
  }

  for (let rowIteratorOne = 0; rowIteratorOne < gridRows; rowIteratorOne++) {
    for (let colIteratorOne = 0; colIteratorOne < gridCols; colIteratorOne++) {
      if (grid[rowIteratorOne][colIteratorOne] === 1) {
        grid[rowIteratorOne][colIteratorOne] = 0;
        let subsequentIslandStatus = obtainIslandCount();
        if (subsequentIslandStatus !== 1) {
          return 1;
        }
        grid[rowIteratorOne][colIteratorOne] = 1;
      }
    }
  }

  return 2;
};

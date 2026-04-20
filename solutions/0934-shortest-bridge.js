/**
 * Shortest Bridge
 * Time Complexity: O(N*N)
 * Space Complexity: O(N*N)
 */
var shortestBridge = function (grid) {
  const matrixDimension = grid.length;
  const expansionQueue = [];
  const moveOffsets = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const exploreIsland = (depthFirstRow, depthFirstCol) => {
    if (
      depthFirstRow < 0 ||
      depthFirstRow >= matrixDimension ||
      depthFirstCol < 0 ||
      depthFirstCol >= matrixDimension ||
      grid[depthFirstRow][depthFirstCol] !== 1
    ) {
      return;
    }

    grid[depthFirstRow][depthFirstCol] = 2;
    expansionQueue.push([depthFirstRow, depthFirstCol]);

    for (const [deltaRowDfs, deltaColDfs] of moveOffsets) {
      exploreIsland(depthFirstRow + deltaRowDfs, depthFirstCol + deltaColDfs);
    }
  };

  let firstIslandFoundFlag = false;
  outerIslandSearch: for (
    let rowIterator = 0;
    rowIterator < matrixDimension;
    rowIterator++
  ) {
    for (let colIterator = 0; colIterator < matrixDimension; colIterator++) {
      if (grid[rowIterator][colIterator] === 1) {
        exploreIsland(rowIterator, colIterator);
        firstIslandFoundFlag = true;
        break outerIslandSearch;
      }
    }
  }

  let currentBridgeLength = 0;
  while (expansionQueue.length > 0) {
    const currentLevelSize = expansionQueue.length;
    for (
      let levelIterator = 0;
      levelIterator < currentLevelSize;
      levelIterator++
    ) {
      const dequeuedPosition = expansionQueue.shift();
      const currentRow = dequeuedPosition[0];
      const currentCol = dequeuedPosition[1];

      for (const [deltaRow, deltaCol] of moveOffsets) {
        const nextRow = currentRow + deltaRow;
        const nextCol = currentCol + deltaCol;

        if (
          nextRow < 0 ||
          nextRow >= matrixDimension ||
          nextCol < 0 ||
          nextCol >= matrixDimension ||
          grid[nextRow][nextCol] === 2
        ) {
          continue;
        }

        if (grid[nextRow][nextCol] === 1) {
          return currentBridgeLength;
        }

        grid[nextRow][nextCol] = 2;
        expansionQueue.push([nextRow, nextCol]);
      }
    }
    currentBridgeLength++;
  }

  return currentBridgeLength;
};

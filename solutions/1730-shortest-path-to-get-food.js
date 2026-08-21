/**
 * Shortest Path To Get Food
 * Intuition: Unweighted grid: BFS from '*' to the nearest '#' avoiding 'X' yields the fewest steps.
 * Approach: 1. Find start '*'. 2. Queue `[row,col,pathLength]`; mark visited. 3. When cell is '#', return `pathLength`. 4. Else enqueue 4-neighbors that are in bounds, unvisited, not 'X'. Return -1 if exhausted.
 * Dry Run: grid with * at (0,0) and # at (0,2) open path → distance 2.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var getFood = function (grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const neighborOffsets = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let initialRow = -1;
  let initialColumn = -1;

  for (let rowIndex = 0; rowIndex < gridHeight; rowIndex++) {
    for (let columnIndex = 0; columnIndex < gridWidth; columnIndex++) {
      if (grid[rowIndex][columnIndex] === "*") {
        initialRow = rowIndex;
        initialColumn = columnIndex;
        break;
      }
    }
    if (initialRow !== -1) {
      break;
    }
  }

  const bfsQueue = [[initialRow, initialColumn, 0]];
  const visitedCells = new Set();
  visitedCells.add(`${initialRow},${initialColumn}`);

  while (bfsQueue.length > 0) {
    const [processRow, processCol, pathLength] = bfsQueue.shift();

    if (grid[processRow][processCol] === "#") {
      return pathLength;
    }

    for (const [offsetRow, offsetCol] of neighborOffsets) {
      const nextRowCoordinate = processRow + offsetRow;
      const nextColCoordinate = processCol + offsetCol;
      const cellIdentifier = `${nextRowCoordinate},${nextColCoordinate}`;

      const isValidRow =
        nextRowCoordinate >= 0 && nextRowCoordinate < gridHeight;
      const isValidCol =
        nextColCoordinate >= 0 && nextColCoordinate < gridWidth;

      if (
        isValidRow &&
        isValidCol &&
        !visitedCells.has(cellIdentifier) &&
        grid[nextRowCoordinate][nextColCoordinate] !== "X"
      ) {
        visitedCells.add(cellIdentifier);
        bfsQueue.push([nextRowCoordinate, nextColCoordinate, pathLength + 1]);
      }
    }
  }

  return -1;
};

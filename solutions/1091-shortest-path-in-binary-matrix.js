/**
 * Shortest Path In Binary Matrix
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var shortestPathBinaryMatrix = function (grid) {
  const gridDimension = grid.length;

  if (grid[0][0] === 1 || grid[gridDimension - 1][gridDimension - 1] === 1) {
    return -1;
  }

  const pathSearchQueue = [];
  pathSearchQueue.push([0, 0, 1]);

  const movementVectors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  grid[0][0] = 1;

  while (pathSearchQueue.length > 0) {
    const pathHead = pathSearchQueue.shift();
    const presentRow = pathHead[0];
    const presentCol = pathHead[1];
    const presentLength = pathHead[2];

    if (presentRow === gridDimension - 1 && presentCol === gridDimension - 1) {
      return presentLength;
    }

    for (let idx = 0; idx < movementVectors.length; idx++) {
      const rowOffset = movementVectors[idx][0];
      const colOffset = movementVectors[idx][1];

      const nextCellRow = presentRow + rowOffset;
      const nextCellCol = presentCol + colOffset;

      if (
        nextCellRow >= 0 &&
        nextCellRow < gridDimension &&
        nextCellCol >= 0 &&
        nextCellCol < gridDimension &&
        grid[nextCellRow][nextCellCol] === 0
      ) {
        grid[nextCellRow][nextCellCol] = 1;
        pathSearchQueue.push([nextCellRow, nextCellCol, presentLength + 1]);
      }
    }
  }

  return -1;
};

/**
 * Shortest Path In Binary Matrix
 * Intuition: Unweighted 8-direction moves make BFS the shortest clear path from (0,0) to (n-1,n-1). Marking visited cells as 1 avoids a separate set.
 * Approach: 1. If start or end is blocked, return -1. 2. Queue (0,0,length=1) and mark start visited. 3. Pop cells; if at the end, return length. 4. Enqueue 8-neighbors that are 0. 5. Exhausted queue → -1.
 * Dry Run: [[0,1],[1,0]]. BFS from (0,0) length 1 goes diagonally to (1,1) length 2.
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

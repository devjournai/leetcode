/**
 * 01 Matrix
 * Intuition: Every 0 is already at distance 0, so multi-source BFS from all zeros yields each cell's nearest-zero distance: the first time a 1 is reached is the shortest path.
 * Approach: 1. Allocate `distanceMap`; enqueue every 0 with distance 0 and set 1-cells to Infinity. 2. Dequeue cells and try the four neighbors. 3. If a neighbor is still Infinity, set distance = current + 1 and enqueue it. 4. Return `distanceMap`.
 * Dry Run: matrix = [[0,0,0],[0,1,0],[1,1,1]].
 *   - Zeros start at 0; (1,1) is Infinity then becomes 1 from a neighbor 0.
 *   - (2,0) and (2,2) become 1; (2,1) becomes 2. Result [[0,0,0],[0,1,0],[1,2,1]].
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var updateMatrix = function (matrix) {
  const totalRows = matrix.length;
  const totalCols = matrix[0].length;

  const distanceMap = Array(totalRows)
    .fill(0)
    .map(() => Array(totalCols).fill(0));
  const processingQueue = [];

  for (
    let currentMatrixRow = 0;
    currentMatrixRow < totalRows;
    currentMatrixRow++
  ) {
    for (
      let currentMatrixCol = 0;
      currentMatrixCol < totalCols;
      currentMatrixCol++
    ) {
      if (matrix[currentMatrixRow][currentMatrixCol] === 0) {
        distanceMap[currentMatrixRow][currentMatrixCol] = 0;
        processingQueue.push([currentMatrixRow, currentMatrixCol]);
      } else {
        distanceMap[currentMatrixRow][currentMatrixCol] = Infinity;
      }
    }
  }

  const rowDeltas = [-1, 1, 0, 0];
  const colDeltas = [0, 0, -1, 1];

  let queuePointer = 0;
  while (queuePointer < processingQueue.length) {
    const currentCellCoordinates = processingQueue[queuePointer];
    queuePointer++;
    const cellRow = currentCellCoordinates[0];
    const cellCol = currentCellCoordinates[1];

    for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
      const nextCellRow = cellRow + rowDeltas[directionIndex];
      const nextCellCol = cellCol + colDeltas[directionIndex];

      const isValidRow = nextCellRow >= 0 && nextCellRow < totalRows;
      const isValidCol = nextCellCol >= 0 && nextCellCol < totalCols;

      if (isValidRow && isValidCol) {
        if (distanceMap[nextCellRow][nextCellCol] === Infinity) {
          distanceMap[nextCellRow][nextCellCol] =
            distanceMap[cellRow][cellCol] + 1;
          processingQueue.push([nextCellRow, nextCellCol]);
        }
      }
    }
  }

  return distanceMap;
};

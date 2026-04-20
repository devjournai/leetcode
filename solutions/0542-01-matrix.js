/**
 * 01 Matrix
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

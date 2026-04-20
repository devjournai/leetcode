/**
 * Map Of Highest Peak
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var highestPeak = function (isWater) {
  const matrixRows = isWater.length;
  const matrixCols = isWater[0].length;
  const peakHeights = Array.from({ length: matrixRows }, () =>
    Array(matrixCols).fill(-1),
  );
  const bfsProcessQueue = [];

  for (let rowIndex = 0; rowIndex < matrixRows; rowIndex++) {
    for (let colIndex = 0; colIndex < matrixCols; colIndex++) {
      if (isWater[rowIndex][colIndex] === 1) {
        peakHeights[rowIndex][colIndex] = 0;
        bfsProcessQueue.push([rowIndex, colIndex]);
      }
    }
  }

  const directionDeltas = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let queuePointer = 0;

  while (queuePointer < bfsProcessQueue.length) {
    const [currentRow, currentCol] = bfsProcessQueue[queuePointer++];
    const currentCellHeight = peakHeights[currentRow][currentCol];

    for (const [deltaRow, deltaCol] of directionDeltas) {
      const nextRowCoord = currentRow + deltaRow;
      const nextColCoord = currentCol + deltaCol;

      if (
        nextRowCoord >= 0 &&
        nextRowCoord < matrixRows &&
        nextColCoord >= 0 &&
        nextColCoord < matrixCols &&
        peakHeights[nextRowCoord][nextColCoord] === -1
      ) {
        peakHeights[nextRowCoord][nextColCoord] = currentCellHeight + 1;
        bfsProcessQueue.push([nextRowCoord, nextColCoord]);
      }
    }
  }

  return peakHeights;
};

/**
 * Map Of Highest Peak
 * Intuition: Water must be height 0 and neighboring cells may differ by at most 1. Multi-source BFS from all water cells sets each land cell to its distance from water, which is the maximum valid height.
 * Approach: 1. Initialize `peakHeights` to -1, set water cells to 0, and enqueue them. 2. Process `bfsProcessQueue` with four `directionDeltas`. 3. Unvisited in-bound neighbors get `currentCellHeight + 1`. 4. Return the height grid.
 * Dry Run: isWater = [[0,1],[0,0]].
 *   - Seed (0,1)=0. Neighbors (0,0) and (1,1) become 1; then (1,0) becomes 2. Result [[1,0],[2,1]].
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var highestPeak = function (isWater) {
  const matrixRows = isWater.length;
  const matrixCols = isWater[0].length;
  const peakHeights = Array.from({ length: matrixRows }, () =>
    Array(matrixCols).fill(-1)
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

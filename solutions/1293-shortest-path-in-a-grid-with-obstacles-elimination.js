/**
 * Shortest Path In A Grid With Obstacles Elimination
 * Time Complexity: O(R * C * K)
 * Space Complexity: O(R * C * K)
 */
var shortestPath = function (grid, k) {
  const gridRowCount = grid.length;
  const gridColCount = grid[0].length;

  if (gridRowCount === 1 && gridColCount === 1) {
    return 0;
  }

  const bfsQueue = [[0, 0, k]];
  const maxKVisitedGrid = Array.from({ length: gridRowCount }, () =>
    Array(gridColCount).fill(-1),
  );
  maxKVisitedGrid[0][0] = k;

  let currentSteps = 0;

  const deltaRows = [-1, 1, 0, 0];
  const deltaCols = [0, 0, -1, 1];

  while (bfsQueue.length > 0) {
    const levelSize = bfsQueue.length;
    for (
      let levelTraversalIndex = 0;
      levelTraversalIndex < levelSize;
      levelTraversalIndex++
    ) {
      const [currentRow, currentCol, obstaclesRemaining] = bfsQueue.shift();

      if (currentRow === gridRowCount - 1 && currentCol === gridColCount - 1) {
        return currentSteps;
      }

      for (
        let directionIterator = 0;
        directionIterator < 4;
        directionIterator++
      ) {
        const nextRow = currentRow + deltaRows[directionIterator];
        const nextCol = currentCol + deltaCols[directionIterator];

        if (
          nextRow < 0 ||
          nextRow >= gridRowCount ||
          nextCol < 0 ||
          nextCol >= gridColCount
        ) {
          continue;
        }

        const cellObstacleValue = grid[nextRow][nextCol];
        let potentialObstaclesRemaining = obstaclesRemaining;

        if (cellObstacleValue === 1) {
          potentialObstaclesRemaining--;
        }

        if (potentialObstaclesRemaining < 0) {
          continue;
        }

        if (maxKVisitedGrid[nextRow][nextCol] >= potentialObstaclesRemaining) {
          continue;
        }

        maxKVisitedGrid[nextRow][nextCol] = potentialObstaclesRemaining;
        bfsQueue.push([nextRow, nextCol, potentialObstaclesRemaining]);
      }
    }
    currentSteps++;
  }

  return -1;
};

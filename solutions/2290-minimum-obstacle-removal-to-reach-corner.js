/**
 * Minimum Obstacle Removal To Reach Corner
 * Intuition: This problem asks for the minimum cost path on a grid where edges have weights 0 (empty cell) or 1 (obstacle cell). This is a classic shortest path problem on a graph with non-negative edge weights, specifically suitable for a 0-1 Breadth-First Search (BFS) algorithm.
 * Approach: 1. Initialize a 2D array, `minimumObstaclesToCell`, to store the minimum obstacles removed to reach each cell, filled with `Number.MAX_SAFE_INTEGER`. 2. Use a `deque` (simulated by a JavaScript array with `unshift` and `push`) to perform a 0-1 BFS. 3. Add the starting cell (0, 0) to the deque, setting `minimumObstaclesToCell[0][0]` to `grid[0][0]` (the cost of the start cell itself). 4. While the deque is not empty, pop the front element (`currentRow`, `currentCol`). 5. For each of its four neighbors: `nextRow`, `nextCol`. 6. Calculate `newObstacleCost = minimumObstaclesToCell[currentRow][currentCol] + grid[nextRow][nextCol]`. 7. If `newObstacleCost` is less than `minimumObstaclesToCell[nextRow][nextCol]`, update `minimumObstaclesToCell[nextRow][nextCol]` with `newObstacleCost`. If `grid[nextRow][nextCol]` is 0, push the neighbor to the front of the deque (`unshift`), otherwise push to the back (`push`). 8. The first time the destination cell `(gridHeight - 1, gridWidth - 1)` is popped from the deque, its `minimumObstaclesToCell` value is the answer.
 * Dry Run: grid = [[0,1,1],[1,1,0],[1,1,0]]
 *   - gridHeight = 3, gridWidth = 3
 *   - minimumObstaclesToCell = [[inf, inf, inf], [inf, inf, inf], [inf, inf, inf]]
 *   - cellProcessDeque = []
 *   - minimumObstaclesToCell[0][0] = grid[0][0] = 0.
 *   - cellProcessDeque.unshift([0, 0]) -> cellProcessDeque = [[0, 0]]
 *
 *   - Deque: [[0, 0]]
 *     - Pop [0, 0]. currentRow = 0, currentCol = 0. currentCellCost = 0.
 *     - Neighbors:
 *       - [0, 1]: grid[0][1]=1. newCost = 0 + 1 = 1. `1 < minimumObstaclesToCell[0][1]` (inf). Update `minimumObstaclesToCell[0][1] = 1`. grid[0][1] is 1, so `cellProcessDeque.push([0, 1])`. Deque: [[0,1]]
 *       - [1, 0]: grid[1][0]=1. newCost = 0 + 1 = 1. `1 < minimumObstaclesToCell[1][0]` (inf). Update `minimumObstaclesToCell[1][0] = 1`. grid[1][0] is 1, so `cellProcessDeque.push([1, 0])`. Deque: [[0,1], [1,0]]
 *
 *   - Deque: [[0,1], [1,0]]
 *     - Pop [0, 1]. currentRow = 0, currentCol = 1. currentCellCost = 1.
 *     - Neighbors:
 *       - [0, 0]: grid[0][0]=0. newCost = 1 + 0 = 1. `1` is not `< minimumObstaclesToCell[0][0]` (0). Skip.
 *       - [0, 2]: grid[0][2]=1. newCost = 1 + 1 = 2. `2 < minimumObstaclesToCell[0][2]` (inf). Update `minimumObstaclesToCell[0][2] = 2`. grid[0][2] is 1, so `cellProcessDeque.push([0, 2])`. Deque: [[1,0], [0,2]]
 *       - [1, 1]: grid[1][1]=1. newCost = 1 + 1 = 2. `2 < minimumObstaclesToCell[1][1]` (inf). Update `minimumObstaclesToCell[1][1] = 2`. grid[1][1] is 1, so `cellProcessDeque.push([1, 1])`. Deque: [[1,0], [0,2], [1,1]]
 *
 *   - Deque: [[1,0], [0,2], [1,1]]
 *     - Pop [1, 0]. currentRow = 1, currentCol = 0. currentCellCost = 1.
 *     - Neighbors:
 *       - [0, 0]: grid[0][0]=0. newCost = 1 + 0 = 1. Not `< minimumObstaclesToCell[0][0]` (0). Skip.
 *       - [1, 1]: grid[1][1]=1. newCost = 1 + 1 = 2. Not `< minimumObstaclesToCell[1][1]` (2). Skip.
 *       - [2, 0]: grid[2][0]=1. newCost = 1 + 1 = 2. `2 < minimumObstaclesToCell[2][0]` (inf). Update `minimumObstaclesToCell[2][0] = 2`. grid[2][0] is 1, so `cellProcessDeque.push([2, 0])`. Deque: [[0,2], [1,1], [2,0]]
 *
 *   - Deque: [[0,2], [1,1], [2,0]]
 *     - Pop [0, 2]. currentRow = 0, currentCol = 2. currentCellCost = 2.
 *     - Neighbors:
 *       - [0, 1]: grid[0][1]=1. newCost = 2 + 1 = 3. Not `< minimumObstaclesToCell[0][1]` (1). Skip.
 *       - [1, 2]: grid[1][2]=0. newCost = 2 + 0 = 2. `2 < minimumObstaclesToCell[1][2]` (inf). Update `minimumObstaclesToCell[1][2] = 2`. grid[1][2] is 0, so `cellProcessDeque.unshift([1, 2])`. Deque: [[1,2], [1,1], [2,0]]
 *
 *   - Deque: [[1,2], [1,1], [2,0]]
 *     - Pop [1, 2]. currentRow = 1, currentCol = 2. currentCellCost = 2.
 *     - Target: Not (2,2).
 *     - Neighbors:
 *       - [0, 2]: grid[0][2]=1. newCost = 2 + 1 = 3. Not `< minimumObstaclesToCell[0][2]` (2). Skip.
 *       - [1, 1]: grid[1][1]=1. newCost = 2 + 1 = 3. Not `< minimumObstaclesToCell[1][1]` (2). Skip.
 *       - [2, 2]: grid[2][2]=0. newCost = 2 + 0 = 2. `2 < minimumObstaclesToCell[2][2]` (inf). Update `minimumObstaclesToCell[2][2] = 2`. grid[2][2] is 0, so `cellProcessDeque.unshift([2, 2])`. Deque: [[2,2], [1,1], [2,0]]
 *
 *   - Deque: [[2,2], [1,1], [2,0]]
 *     - Pop [2, 2]. currentRow = 2, currentCol = 2. currentCellCost = 2.
 *     - Target: Yes, (2,2). Return `currentCellCost` which is 2.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var minimumObstacles = function (grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const minimumObstaclesToCell = new Array(gridHeight)
    .fill(null)
    .map(() => new Array(gridWidth).fill(Number.MAX_SAFE_INTEGER));
  const coordinateDeque = [];

  const rowOffsets = [0, 0, 1, -1];
  const colOffsets = [1, -1, 0, 0];

  minimumObstaclesToCell[0][0] = grid[0][0];
  coordinateDeque.unshift([0, 0]);

  const targetRow = gridHeight - 1;
  const targetCol = gridWidth - 1;

  while (coordinateDeque.length > 0) {
    const currentPosition = coordinateDeque.shift();
    const currentRowCoord = currentPosition[0];
    const currentColCoord = currentPosition[1];
    const currentObstacleCost =
      minimumObstaclesToCell[currentRowCoord][currentColCoord];

    if (currentRowCoord === targetRow && currentColCoord === targetCol) {
      return currentObstacleCost;
    }

    for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
      const nextRowCoord = currentRowCoord + rowOffsets[directionIndex];
      const nextColCoord = currentColCoord + colOffsets[directionIndex];

      const isValidRow = nextRowCoord >= 0 && nextRowCoord < gridHeight;
      const isValidCol = nextColCoord >= 0 && nextColCoord < gridWidth;

      if (isValidRow && isValidCol) {
        const obstacleValue = grid[nextRowCoord][nextColCoord];
        const potentialNewCost = currentObstacleCost + obstacleValue;

        if (
          potentialNewCost < minimumObstaclesToCell[nextRowCoord][nextColCoord]
        ) {
          minimumObstaclesToCell[nextRowCoord][nextColCoord] = potentialNewCost;
          if (obstacleValue === 0) {
            coordinateDeque.unshift([nextRowCoord, nextColCoord]);
          } else {
            coordinateDeque.push([nextRowCoord, nextColCoord]);
          }
        }
      }
    }
  }

  // Should not be reached if a path always exists, but good practice for unreachable code
  return minimumObstaclesToCell[targetRow][targetCol];
};

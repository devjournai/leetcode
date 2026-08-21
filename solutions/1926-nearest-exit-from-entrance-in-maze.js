/**
 * Nearest Exit From Entrance In Maze
 * Intuition: An exit is any empty border cell other than the entrance. Unweighted steps mean BFS from the entrance finds the shortest path to the first such border cell.
 * Approach: 1. Enqueue `[entranceRow, entranceCol, 0]` and mark visited. 2. While the queue is nonempty, dequeue a cell; if it is on the border and `steps > 0`, return `steps`. 3. Push unvisited non-wall neighbors with `steps+1`. 4. If BFS ends, return -1.
 * Dry Run: maze empty 3x3, entrance = [1,1].
 *   - Start (1,1) step 0 is not an exit (steps==0).
 *   - Neighbors (0,1),(2,1),(1,0),(1,2) are borders with step 1 → return 1.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var nearestExit = function (maze, entrance) {
  const mazeRowCount = maze.length;
  const mazeColCount = maze[0].length;

  const initialRowIndex = entrance[0];
  const initialColIndex = entrance[1];

  const bfsQueue = [];
  bfsQueue.push([initialRowIndex, initialColIndex, 0]);

  const cellVisitStatus = Array(mazeRowCount)
    .fill(null)
    .map(() => Array(mazeColCount).fill(false));
  cellVisitStatus[initialRowIndex][initialColIndex] = true;

  const rowDelta = [-1, 1, 0, 0];
  const colDelta = [0, 0, -1, 1];

  while (bfsQueue.length > 0) {
    const [currentRowCell, currentColCell, currentStepsTaken] =
      bfsQueue.shift();

    const onMazeBorder =
      currentRowCell === 0 ||
      currentRowCell === mazeRowCount - 1 ||
      currentColCell === 0 ||
      currentColCell === mazeColCount - 1;

    if (onMazeBorder && currentStepsTaken > 0) {
      return currentStepsTaken;
    }

    for (let directionCounter = 0; directionCounter < 4; directionCounter++) {
      const nextAdjacentRow = currentRowCell + rowDelta[directionCounter];
      const nextAdjacentCol = currentColCell + colDelta[directionCounter];

      const inBoundsRow =
        nextAdjacentRow >= 0 && nextAdjacentRow < mazeRowCount;
      const inBoundsCol =
        nextAdjacentCol >= 0 && nextAdjacentCol < mazeColCount;

      if (inBoundsRow && inBoundsCol) {
        const isWallObstacle = maze[nextAdjacentRow][nextAdjacentCol] === "+";
        const alreadyProcessed =
          cellVisitStatus[nextAdjacentRow][nextAdjacentCol];

        if (!isWallObstacle && !alreadyProcessed) {
          cellVisitStatus[nextAdjacentRow][nextAdjacentCol] = true;
          bfsQueue.push([
            nextAdjacentRow,
            nextAdjacentCol,
            currentStepsTaken + 1,
          ]);
        }
      }
    }
  }

  return -1;
};

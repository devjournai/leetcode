/**
 * Matrix Cells In Distance Order
 * Intuition: BFS from the center visits cells in nondecreasing Manhattan distance.
 * Approach: 1. Queue the center and mark visited. 2. Pop cells into the result. 3. Enqueue unvisited 4-neighbors. 4. Return the visit order.
 * Dry Run: rows=2, cols=2, rCenter=0, cCenter=1.
 *   - Start [0,1]. Neighbors [0,0] then [1,1], then [1,0]. Order [[0,1],[0,0],[1,1],[1,0]].
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var allCellsDistOrder = function (rows, cols, rCenter, cCenter) {
  const finalOrderedCells = [];
  const queueElements = [];
  let headPointer = 0;
  let tailPointer = 0;

  const visitedMatrix = Array(rows)
    .fill(0)
    .map(() => Array(cols).fill(false));

  queueElements[tailPointer++] = [rCenter, cCenter];
  visitedMatrix[rCenter][cCenter] = true;

  const rowDelta = [0, 0, 1, -1];
  const colDelta = [1, -1, 0, 0];
  const totalDirections = 4;

  while (headPointer < tailPointer) {
    const currentCoordinates = queueElements[headPointer++];
    const currentRow = currentCoordinates[0];
    const currentCol = currentCoordinates[1];
    finalOrderedCells.push(currentCoordinates);

    for (
      let directionIndex = 0;
      directionIndex < totalDirections;
      directionIndex++
    ) {
      const nextRow = currentRow + rowDelta[directionIndex];
      const nextCol = currentCol + colDelta[directionIndex];

      const isNextRowValid = nextRow >= 0 && nextRow < rows;
      const isNextColValid = nextCol >= 0 && nextCol < cols;

      if (isNextRowValid && isNextColValid) {
        const isNextCellUnvisited = !visitedMatrix[nextRow][nextCol];
        if (isNextCellUnvisited) {
          visitedMatrix[nextRow][nextCol] = true;
          queueElements[tailPointer++] = [nextRow, nextCol];
        }
      }
    }
  }

  return finalOrderedCells;
};

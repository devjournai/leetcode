/**
 * Check If There Is A Valid Path In A Grid
 * Intuition: Each street type connects two directions. BFS from (0,0) only steps to a neighbor if that neighbor's type is in the allowed list for that direction.
 * Approach: 1. Map types 1–6 to (delta, compatible neighbor types). 2. BFS with a visited set of "r,c". 3. From the current type, try each legal neighbor that is in bounds, unvisited, and compatible. 4. Return true on reaching the bottom-right, else false.
 * Dry Run: grid = [[2,4,3],[6,5,2]].
 *   - (0,0) type 2 goes down to (1,0) type 6 (allowed). 6 goes right to (1,1) type 5. 5 goes right to (1,2) type 2. Reach end. Return true.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var hasValidPath = function (grid) {
  const gridRowCount = grid.length;
  const gridColumnCount = grid[0].length;

  const connectionMap = {
    1: [
      [0, -1, [1, 4, 6]],
      [0, 1, [1, 3, 5]],
    ],
    2: [
      [-1, 0, [2, 3, 4]],
      [1, 0, [2, 5, 6]],
    ],
    3: [
      [0, -1, [1, 4, 6]],
      [1, 0, [2, 5, 6]],
    ],
    4: [
      [0, 1, [1, 3, 5]],
      [1, 0, [2, 5, 6]],
    ],
    5: [
      [0, -1, [1, 4, 6]],
      [-1, 0, [2, 3, 4]],
    ],
    6: [
      [0, 1, [1, 3, 5]],
      [-1, 0, [2, 3, 4]],
    ],
  };

  const pathQueue = [];
  const visitedCells = new Set();

  const startRowIndex = 0;
  const startColIndex = 0;

  const targetRowIndex = gridRowCount - 1;
  const targetColIndex = gridColumnCount - 1;

  pathQueue.push([startRowIndex, startColIndex]);
  visitedCells.add(`${startRowIndex},${startColIndex}`);

  while (pathQueue.length > 0) {
    const currentCellCoordinates = pathQueue.shift();
    const currentRowCoordinate = currentCellCoordinates[0];
    const currentColCoordinate = currentCellCoordinates[1];

    if (
      currentRowCoordinate === targetRowIndex &&
      currentColCoordinate === targetColIndex
    ) {
      return true;
    }

    const currentStreetType = grid[currentRowCoordinate][currentColCoordinate];
    const possibleNextMoves = connectionMap[currentStreetType];

    for (const singleMoveOption of possibleNextMoves) {
      const deltaRowChange = singleMoveOption[0];
      const deltaColChange = singleMoveOption[1];
      const allowedNeighborStreetTypes = singleMoveOption[2];

      const nextRowCoordinate = currentRowCoordinate + deltaRowChange;
      const nextColCoordinate = currentColCoordinate + deltaColChange;

      const isNextRowValid =
        nextRowCoordinate >= 0 && nextRowCoordinate < gridRowCount;
      const isNextColValid =
        nextColCoordinate >= 0 && nextColCoordinate < gridColumnCount;

      if (isNextRowValid && isNextColValid) {
        const nextPositionKey = `${nextRowCoordinate},${nextColCoordinate}`;
        const hasBeenVisited = visitedCells.has(nextPositionKey);

        if (!hasBeenVisited) {
          const nextCellStreetType = grid[nextRowCoordinate][nextColCoordinate];
          const isNeighborStreetCompatible =
            allowedNeighborStreetTypes.includes(nextCellStreetType);

          if (isNeighborStreetCompatible) {
            visitedCells.add(nextPositionKey);
            pathQueue.push([nextRowCoordinate, nextColCoordinate]);
          }
        }
      }
    }
  }

  return false;
};

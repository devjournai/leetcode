/**
 * Shortest Path To Get All Keys
 * Intuition: BFS state is (row, col, key bitmask). Walls block; lowercase letters OR a key bit; uppercase needs that bit. Done when mask is all keys.
 * Approach: 1. Find '@' and count keys a–f. 2. Queue [r,c,0,0], visited `r,c,mask`. 3. Four directions; skip '#', locked doors, seen states. 4. Return steps when mask==allKeys else -1.
 * Dry Run: ["@.a.#","###.#","b.A.B"]. Pick a then unlock A, pick b. First time mask=11 at B's key path length 8.
 * Time Complexity: O(R * C * 2^K)
 * Space Complexity: O(R * C * 2^K)
 */
var shortestPathAllKeys = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;
  let initialPositionRow;
  let initialPositionCol;
  let totalUniqueKeys = 0;

  for (
    let currentGridRowIterator = 0;
    currentGridRowIterator < gridRows;
    currentGridRowIterator++
  ) {
    for (
      let currentGridColIterator = 0;
      currentGridColIterator < gridCols;
      currentGridColIterator++
    ) {
      const cellContent = grid[currentGridRowIterator][currentGridColIterator];
      if (cellContent === "@") {
        initialPositionRow = currentGridRowIterator;
        initialPositionCol = currentGridColIterator;
      } else if (cellContent >= "a" && cellContent <= "f") {
        totalUniqueKeys++;
      }
    }
  }

  const directionMoves = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const bfsQueue = [[initialPositionRow, initialPositionCol, 0, 0]];
  const visitedSet = new Set([`${initialPositionRow},${initialPositionCol},0`]);

  const allKeysMask = (1 << totalUniqueKeys) - 1;

  while (bfsQueue.length > 0) {
    const [presentRow, presentCol, collectedKeysMask, currentStepsTaken] =
      bfsQueue.shift();

    if (collectedKeysMask === allKeysMask) {
      return currentStepsTaken;
    }

    for (const [drOffset, dcOffset] of directionMoves) {
      const nextGridCoordinateRow = presentRow + drOffset;
      const nextGridCoordinateCol = presentCol + dcOffset;

      if (
        nextGridCoordinateRow >= 0 &&
        nextGridCoordinateRow < gridRows &&
        nextGridCoordinateCol >= 0 &&
        nextGridCoordinateCol < gridCols &&
        grid[nextGridCoordinateRow][nextGridCoordinateCol] !== "#"
      ) {
        const nextCellChar = grid[nextGridCoordinateRow][nextGridCoordinateCol];
        let nextKeysStateMask = collectedKeysMask;

        if (nextCellChar >= "a" && nextCellChar <= "f") {
          nextKeysStateMask =
            collectedKeysMask |
            (1 << (nextCellChar.charCodeAt(0) - "a".charCodeAt(0)));
        } else if (nextCellChar >= "A" && nextCellChar <= "F") {
          const requiredKeyBit =
            1 << (nextCellChar.charCodeAt(0) - "A".charCodeAt(0));
          if (!(collectedKeysMask & requiredKeyBit)) {
            continue;
          }
        }

        const stateIdentifier = `${nextGridCoordinateRow},${nextGridCoordinateCol},${nextKeysStateMask}`;
        if (!visitedSet.has(stateIdentifier)) {
          visitedSet.add(stateIdentifier);
          bfsQueue.push([
            nextGridCoordinateRow,
            nextGridCoordinateCol,
            nextKeysStateMask,
            currentStepsTaken + 1,
          ]);
        }
      }
    }
  }

  return -1;
};

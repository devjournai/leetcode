/**
 * Last Day Where You Can Still Cross
 * Intuition: Cells flood in order; connectivity from top to bottom is monotonic in the day index, so binary search the latest day and BFS on the land remaining after that many floods.
 * Approach: 1. Search `lowDay..highDay` on `cells.length`. 2. `checkIfPossible(mid)` marks the first `mid` cells as water, BFS from every dry cell on row 0, 4-direction, returning true if row `row-1` is reached. 3. If possible, try a later day; else earlier. 4. Return `answerDay`.
 * Dry Run: row=2, col=2, cells = [[1,1],[2,1],[1,2],[2,2]].
 *   - After day 1, top-left flooded; path still exists via (1,2)→(2,2). After day 2, left column water; may still cross. Latest successful mid is 2.
 * Time Complexity: O(R * C * log N)
 * Space Complexity: O(R * C)
 */
var latestDayToCross = function (row, col, cells) {
  let lowDay = 1;
  let highDay = cells.length;
  let answerDay = 0;

  const checkIfPossible = (currentDayLimit) => {
    const gridConfiguration = Array.from({ length: row }, () =>
      Array(col).fill(0)
    );
    for (
      let waterCellIndex = 0;
      waterCellIndex < currentDayLimit;
      waterCellIndex++
    ) {
      const [rCoord, cCoord] = cells[waterCellIndex];
      gridConfiguration[rCoord - 1][cCoord - 1] = 1;
    }

    const pathQueue = [];
    const visitedStatus = Array.from({ length: row }, () =>
      Array(col).fill(false)
    );

    for (let initialColumn = 0; initialColumn < col; initialColumn++) {
      if (gridConfiguration[0][initialColumn] === 0) {
        pathQueue.push([0, initialColumn]);
        visitedStatus[0][initialColumn] = true;
      }
    }

    const movementOffsets = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    while (pathQueue.length > 0) {
      const [currentRow, currentCol] = pathQueue.shift();
      if (currentRow === row - 1) {
        return true;
      }

      for (const movementOffset of movementOffsets) {
        const [rowChange, colChange] = movementOffset;
        const nextRowPos = currentRow + rowChange;
        const nextColPos = currentCol + colChange;

        if (
          nextRowPos >= 0 &&
          nextRowPos < row &&
          nextColPos >= 0 &&
          nextColPos < col &&
          !visitedStatus[nextRowPos][nextColPos] &&
          gridConfiguration[nextRowPos][nextColPos] === 0
        ) {
          pathQueue.push([nextRowPos, nextColPos]);
          visitedStatus[nextRowPos][nextColPos] = true;
        }
      }
    }
    return false;
  };

  while (lowDay <= highDay) {
    const midPoint = Math.floor((lowDay + highDay) / 2);
    if (checkIfPossible(midPoint)) {
      answerDay = midPoint;
      lowDay = midPoint + 1;
    } else {
      highDay = midPoint - 1;
    }
  }

  return answerDay;
};

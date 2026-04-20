/**
 * Last Day Where You Can Still Cross
 * Time Complexity: O(R * C * log N)
 * Space Complexity: O(R * C)
 */
var latestDayToCross = function (row, col, cells) {
  let lowDay = 1;
  let highDay = cells.length;
  let answerDay = 0;

  const checkIfPossible = (currentDayLimit) => {
    const gridConfiguration = Array.from({ length: row }, () =>
      Array(col).fill(0),
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
      Array(col).fill(false),
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

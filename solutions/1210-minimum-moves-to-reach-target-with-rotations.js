/**
 * Minimum Moves To Reach Target With Rotations
 * Intuition: The snake is a 2-cell state (tail, orientation) on an empty grid; BFS finds the shortest sequence of crawls and rotations to the bottom-right horizontal pose.
 * Approach: 1. BFS from (0,0,horizontal). 2. From horizontal: crawl right/down if cells are 0, or clockwise-rotate if the 2×2 square is empty. 3. From vertical: crawl right/down or counterclockwise-rotate analogously. 4. Return moves when tail is at (n-1,n-2) horizontal, else -1.
 * Dry Run: 3×3 empty grid. Start horizontal at top-left; sequence of downs/rights/rotations reaches (2,1) horizontal in 5 moves.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var minimumMoves = function (grid) {
  const nGridDimension = grid.length;
  const initialSnakeRow = 0;
  const initialSnakeColumn = 0;
  const initialSnakeOrientation = 0;
  const initialMoveCount = 0;

  const targetSnakeRow = nGridDimension - 1;
  const targetSnakeColumn = nGridDimension - 2;
  const targetSnakeOrientation = 0;

  const horizontalOrientationValue = 0;
  const verticalOrientationValue = 1;

  const queueSnakeStates = [
    [
      initialSnakeRow,
      initialSnakeColumn,
      initialSnakeOrientation,
      initialMoveCount,
    ],
  ];
  const visitedSnakePositions = new Set();
  const initialPositionKey = `${initialSnakeRow},${initialSnakeColumn},${initialSnakeOrientation}`;
  visitedSnakePositions.add(initialPositionKey);

  const checkCellValidity = (rowIndexToCheck, colIndexToCheck) => {
    return (
      rowIndexToCheck >= 0 &&
      rowIndexToCheck < nGridDimension &&
      colIndexToCheck >= 0 &&
      colIndexToCheck < nGridDimension &&
      grid[rowIndexToCheck][colIndexToCheck] === 0
    );
  };

  while (queueSnakeStates.length > 0) {
    const [
      currentRowCoordinate,
      currentColCoordinate,
      currentOrientationState,
      currentTotalMoves,
    ] = queueSnakeStates.shift();

    if (
      currentRowCoordinate === targetSnakeRow &&
      currentColCoordinate === targetSnakeColumn &&
      currentOrientationState === targetSnakeOrientation
    ) {
      return currentTotalMoves;
    }

    if (currentOrientationState === horizontalOrientationValue) {
      const moveRightNewRowH = currentRowCoordinate;
      const moveRightNewColH = currentColCoordinate + 1;
      const moveRightNewOrientationH = horizontalOrientationValue;
      const moveRightNextCoordinateCol = currentColCoordinate + 2;

      if (
        moveRightNextCoordinateCol < nGridDimension &&
        checkCellValidity(moveRightNewRowH, moveRightNextCoordinateCol)
      ) {
        const moveRightStateKeyH = `${moveRightNewRowH},${moveRightNewColH},${moveRightNewOrientationH}`;
        if (!visitedSnakePositions.has(moveRightStateKeyH)) {
          visitedSnakePositions.add(moveRightStateKeyH);
          queueSnakeStates.push([
            moveRightNewRowH,
            moveRightNewColH,
            moveRightNewOrientationH,
            currentTotalMoves + 1,
          ]);
        }
      }

      const moveDownNewRowH = currentRowCoordinate + 1;
      const moveDownNewColH = currentColCoordinate;
      const moveDownNewOrientationH = horizontalOrientationValue;
      const moveDownRowCheck = currentRowCoordinate + 1;
      const moveDownColCheckOne = currentColCoordinate;
      const moveDownColCheckTwo = currentColCoordinate + 1;

      if (
        moveDownRowCheck < nGridDimension &&
        checkCellValidity(moveDownRowCheck, moveDownColCheckOne) &&
        checkCellValidity(moveDownRowCheck, moveDownColCheckTwo)
      ) {
        const moveDownStateKeyH = `${moveDownNewRowH},${moveDownNewColH},${moveDownNewOrientationH}`;
        if (!visitedSnakePositions.has(moveDownStateKeyH)) {
          visitedSnakePositions.add(moveDownStateKeyH);
          queueSnakeStates.push([
            moveDownNewRowH,
            moveDownNewColH,
            moveDownNewOrientationH,
            currentTotalMoves + 1,
          ]);
        }
      }

      const rotateClockwiseNewRowH = currentRowCoordinate;
      const rotateClockwiseNewColH = currentColCoordinate;
      const rotateClockwiseNewOrientationH = verticalOrientationValue;
      const rotateClockwiseCheckRow = currentRowCoordinate + 1;
      const rotateClockwiseCheckColOne = currentColCoordinate;
      const rotateClockwiseCheckColTwo = currentColCoordinate + 1;

      if (
        rotateClockwiseCheckRow < nGridDimension &&
        checkCellValidity(
          rotateClockwiseCheckRow,
          rotateClockwiseCheckColOne
        ) &&
        checkCellValidity(rotateClockwiseCheckRow, rotateClockwiseCheckColTwo)
      ) {
        const rotateClockwiseStateKeyH = `${rotateClockwiseNewRowH},${rotateClockwiseNewColH},${rotateClockwiseNewOrientationH}`;
        if (!visitedSnakePositions.has(rotateClockwiseStateKeyH)) {
          visitedSnakePositions.add(rotateClockwiseStateKeyH);
          queueSnakeStates.push([
            rotateClockwiseNewRowH,
            rotateClockwiseNewColH,
            rotateClockwiseNewOrientationH,
            currentTotalMoves + 1,
          ]);
        }
      }
    } else {
      const moveRightNewRowV = currentRowCoordinate;
      const moveRightNewColV = currentColCoordinate + 1;
      const moveRightNewOrientationV = verticalOrientationValue;
      const moveRightCheckRowOne = currentRowCoordinate;
      const moveRightCheckRowTwo = currentRowCoordinate + 1;
      const moveRightCheckCol = currentColCoordinate + 1;

      if (
        moveRightCheckCol < nGridDimension &&
        checkCellValidity(moveRightCheckRowOne, moveRightCheckCol) &&
        checkCellValidity(moveRightCheckRowTwo, moveRightCheckCol)
      ) {
        const moveRightStateKeyV = `${moveRightNewRowV},${moveRightNewColV},${moveRightNewOrientationV}`;
        if (!visitedSnakePositions.has(moveRightStateKeyV)) {
          visitedSnakePositions.add(moveRightStateKeyV);
          queueSnakeStates.push([
            moveRightNewRowV,
            moveRightNewColV,
            moveRightNewOrientationV,
            currentTotalMoves + 1,
          ]);
        }
      }

      const moveDownNewRowV = currentRowCoordinate + 1;
      const moveDownNewColV = currentColCoordinate;
      const moveDownNewOrientationV = verticalOrientationValue;
      const moveDownRowCheckV = currentRowCoordinate + 2;
      const moveDownColCheckV = currentColCoordinate;

      if (
        moveDownRowCheckV < nGridDimension &&
        checkCellValidity(moveDownRowCheckV, moveDownColCheckV)
      ) {
        const moveDownStateKeyV = `${moveDownNewRowV},${moveDownNewColV},${moveDownNewOrientationV}`;
        if (!visitedSnakePositions.has(moveDownStateKeyV)) {
          visitedSnakePositions.add(moveDownStateKeyV);
          queueSnakeStates.push([
            moveDownNewRowV,
            moveDownNewColV,
            moveDownNewOrientationV,
            currentTotalMoves + 1,
          ]);
        }
      }

      const rotateCounterClockwiseNewRowV = currentRowCoordinate;
      const rotateCounterClockwiseNewColV = currentColCoordinate;
      const rotateCounterClockwiseNewOrientationV = horizontalOrientationValue;
      const rotateCounterClockwiseCheckCol = currentColCoordinate + 1;
      const rotateCounterClockwiseCheckRowOne = currentRowCoordinate;
      const rotateCounterClockwiseCheckRowTwo = currentRowCoordinate + 1;

      if (
        rotateCounterClockwiseCheckCol < nGridDimension &&
        checkCellValidity(
          rotateCounterClockwiseCheckRowOne,
          rotateCounterClockwiseCheckCol
        ) &&
        checkCellValidity(
          rotateCounterClockwiseCheckRowTwo,
          rotateCounterClockwiseCheckCol
        )
      ) {
        const rotateCounterClockwiseStateKeyV = `${rotateCounterClockwiseNewRowV},${rotateCounterClockwiseNewColV},${rotateCounterClockwiseNewOrientationV}`;
        if (!visitedSnakePositions.has(rotateCounterClockwiseStateKeyV)) {
          Outs;
          visitedSnakePositions.add(rotateCounterClockwiseStateKeyV);
          queueSnakeStates.push([
            rotateCounterClockwiseNewRowV,
            rotateCounterClockwiseNewColV,
            rotateCounterClockwiseNewOrientationV,
            currentTotalMoves + 1,
          ]);
        }
      }
    }
  }

  return -1;
};

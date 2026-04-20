/**
 * Cat And Mouse II
 * Time Complexity: O((R * C)^3 * max(catJump, mouseJump))
 * Space Complexity: O((R * C)^3)
 */
var canMouseWin = function (gridInput, catJumpInput, mouseJumpInput) {
  if (typeof gridInput === "string") gridInput = [gridInput];

  const gridRows = gridInput.length;
  const gridCols = gridInput[0].length;
  const directionVectors = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let mouseStartLocation;
  let catStartLocation;
  let foodTargetLocation;
  let emptyCellsCount = 0;

  for (let rowIndex = 0; rowIndex < gridRows; rowIndex++) {
    for (let colIndex = 0; colIndex < gridCols; colIndex++) {
      const cellType = gridInput[rowIndex][colIndex];
      if (cellType !== "#") {
        emptyCellsCount++;
      }
      if (cellType === "M") {
        mouseStartLocation = [rowIndex, colIndex];
      } else if (cellType === "C") {
        catStartLocation = [rowIndex, colIndex];
      } else if (cellType === "F") {
        foodTargetLocation = [rowIndex, colIndex];
      }
    }
  }

  const memoizationStore = new Map();

  const checkCoordinateValidity = (checkRow, checkCol) => {
    return (
      checkRow >= 0 &&
      checkRow < gridRows &&
      checkCol >= 0 &&
      checkCol < gridCols &&
      gridInput[checkRow][checkCol] !== "#"
    );
  };

  const createStateKey = (gameTurn, mouseCoordsCurrent, catCoordsCurrent) => {
    return `${gameTurn},${mouseCoordsCurrent[0]},${mouseCoordsCurrent[1]},${catCoordsCurrent[0]},${catCoordsCurrent[1]}`;
  };

  const solveGameOutcome = (
    currentTurnNumber,
    mouseCurrentPosition,
    catCurrentPosition,
  ) => {
    const uniqueStateKey = createStateKey(
      currentTurnNumber,
      mouseCurrentPosition,
      catCurrentPosition,
    );
    if (memoizationStore.has(uniqueStateKey)) {
      return memoizationStore.get(uniqueStateKey);
    }

    if (currentTurnNumber >= emptyCellsCount * 2) {
      memoizationStore.set(uniqueStateKey, 0);
      return 0;
    }

    const isMousePlayerTurn = currentTurnNumber % 2 === 0;
    const currentJumpingLimit = isMousePlayerTurn
      ? mouseJumpInput
      : catJumpInput;
    const playerCurrentRow = isMousePlayerTurn
      ? mouseCurrentPosition[0]
      : catCurrentPosition[0];
    const playerCurrentCol = isMousePlayerTurn
      ? mouseCurrentPosition[1]
      : catCurrentPosition[1];

    if (isMousePlayerTurn) {
      for (const [deltaRowMove, deltaColMove] of directionVectors) {
        for (let jumpUnits = 0; jumpUnits <= currentJumpingLimit; jumpUnits++) {
          const nextMouseRowPosition =
            playerCurrentRow + deltaRowMove * jumpUnits;
          const nextMouseColPosition =
            playerCurrentCol + deltaColMove * jumpUnits;

          if (
            !checkCoordinateValidity(nextMouseRowPosition, nextMouseColPosition)
          ) {
            break;
          }

          if (gridInput[nextMouseRowPosition][nextMouseColPosition] === "F") {
            memoizationStore.set(uniqueStateKey, 1);
            return 1;
          }

          if (
            solveGameOutcome(
              currentTurnNumber + 1,
              [nextMouseRowPosition, nextMouseColPosition],
              catCurrentPosition,
            ) === 1
          ) {
            memoizationStore.set(uniqueStateKey, 1);
            return 1;
          }
        }
      }
      memoizationStore.set(uniqueStateKey, 0);
      return 0;
    } else {
      for (const [changeRowAmount, changeColAmount] of directionVectors) {
        for (
          let stepDistance = 0;
          stepDistance <= currentJumpingLimit;
          stepDistance++
        ) {
          const nextCatRowPosition =
            playerCurrentRow + changeRowAmount * stepDistance;
          const nextCatColPosition =
            playerCurrentCol + changeColAmount * stepDistance;

          if (
            !checkCoordinateValidity(nextCatRowPosition, nextCatColPosition)
          ) {
            break;
          }

          if (gridInput[nextCatRowPosition][nextCatColPosition] === "F") {
            memoizationStore.set(uniqueStateKey, 0);
            return 0;
          }

          if (
            nextCatRowPosition === mouseCurrentPosition[0] &&
            nextCatColPosition === mouseCurrentPosition[1]
          ) {
            memoizationStore.set(uniqueStateKey, 0);
            return 0;
          }

          if (
            solveGameOutcome(currentTurnNumber + 1, mouseCurrentPosition, [
              nextCatRowPosition,
              nextCatColPosition,
            ]) === 0
          ) {
            memoizationStore.set(uniqueStateKey, 0);
            return 0;
          }
        }
      }
      memoizationStore.set(uniqueStateKey, 1);
      return 1;
    }
  };

  return solveGameOutcome(0, mouseStartLocation, catStartLocation) === 1;
};

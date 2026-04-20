/**
 * Contain Virus
 * Time Complexity: O((M*N)^2)
 * Space Complexity: O(M*N)
 */
var containVirus = function (initialGrid) {
  const gridHeight = initialGrid.length;
  const gridWidth = initialGrid[0].length;

  const upDownWalls = new Set();
  const leftRightWalls = new Set();

  const moveVectors = [
    [-1, 0, -gridWidth, -gridWidth],
    [1, 0, gridWidth, 0],
    [0, -1, -1, -1],
    [0, 1, 1, 0],
  ];

  let totalWallsInstalled = 0;
  let currentQuarantineStartRow = -1;
  let currentQuarantineStartCol = -1;

  function processConnectedCells(
    currentProcRow,
    currentProcCol,
    mapState,
    seekingValue,
    settingValue,
    gatheredThreats,
    gatheredVertWalls,
    gatheredHorizWalls,
    existingUpDownWalls,
    existingLeftRightWalls,
  ) {
    if (
      currentProcRow < 0 ||
      currentProcRow >= gridHeight ||
      currentProcCol < 0 ||
      currentProcCol >= gridWidth ||
      mapState[currentProcRow][currentProcCol] !== seekingValue
    ) {
      return;
    }

    mapState[currentProcRow][currentProcCol] = settingValue;

    const currentCellFlattened = gridWidth * currentProcRow + currentProcCol;

    for (let moveDirIndex = 0; moveDirIndex < 4; moveDirIndex++) {
      const [rowChange, colChange, threatCellOffset, wallKeyOffset] =
        moveVectors[moveDirIndex];
      const neighborRow = currentProcRow + rowChange;
      const neighborCol = currentProcCol + colChange;

      processConnectedCells(
        neighborRow,
        neighborCol,
        mapState,
        seekingValue,
        settingValue,
        gatheredThreats,
        gatheredVertWalls,
        gatheredHorizWalls,
        existingUpDownWalls,
        existingLeftRightWalls,
      );

      if (
        neighborRow < 0 ||
        neighborRow >= gridHeight ||
        neighborCol < 0 ||
        neighborCol >= gridWidth
      ) {
        continue;
      }

      const isVerticalBoundaryCheck = rowChange !== 0;
      const wallBoundaryKey = currentCellFlattened + wallKeyOffset;

      const isWallAlreadyPresent = isVerticalBoundaryCheck
        ? existingUpDownWalls.has(wallBoundaryKey)
        : existingLeftRightWalls.has(wallBoundaryKey);

      if (mapState[neighborRow][neighborCol] !== 0 || isWallAlreadyPresent) {
        continue;
      }

      if (settingValue !== 0) {
        gatheredThreats.add(currentCellFlattened + threatCellOffset);
      }

      if (settingValue === 2) {
        if (isVerticalBoundaryCheck) {
          gatheredVertWalls.add(wallBoundaryKey);
        } else {
          gatheredHorizWalls.add(wallBoundaryKey);
        }
      }
    }
  }

  function findMostThreateningRegion(explorationStartRow, explorationStartCol) {
    let iterationThreatenedCells = new Set();
    let iterationPotentialVerticalWalls = new Set();
    let iterationPotentialHorizontalWalls = new Set();

    processConnectedCells(
      explorationStartRow,
      explorationStartCol,
      initialGrid,
      1,
      2,
      iterationThreatenedCells,
      iterationPotentialVerticalWalls,
      iterationPotentialHorizontalWalls,
      upDownWalls,
      leftRightWalls,
    );

    if (iterationThreatenedCells.size > currentMaxThreat) {
      currentMaxThreat = iterationThreatenedCells.size;
      currentBestVerticalWalls = iterationPotentialVerticalWalls;
      currentBestHorizontalWalls = iterationPotentialHorizontalWalls;
      currentQuarantineStartRow = explorationStartRow;
      currentQuarantineStartCol = explorationStartCol;
    }
  }

  for (let currentSimulationDay = 0; ; currentSimulationDay++) {
    let currentMaxThreat = 0;
    let currentBestVerticalWalls = new Set();
    let currentBestHorizontalWalls = new Set();
    currentQuarantineStartRow = -1;
    currentQuarantineStartCol = -1;

    for (let searchRow = 0; searchRow < gridHeight; searchRow++) {
      for (let searchCol = 0; searchCol < gridWidth; searchCol++) {
        if (initialGrid[searchRow][searchCol] === 1) {
          findMostThreateningRegion(searchRow, searchCol);
        }
      }
    }

    if (currentMaxThreat === 0) {
      break;
    }

    currentBestVerticalWalls.forEach((wallIdentifier) =>
      upDownWalls.add(wallIdentifier),
    );
    currentBestHorizontalWalls.forEach((wallIdentifier) =>
      leftRightWalls.add(wallIdentifier),
    );
    totalWallsInstalled +=
      currentBestVerticalWalls.size + currentBestHorizontalWalls.size;

    let quarantineProcessTarget = 2;
    let quarantineProcessSetter = 0;

    let dummyThreatAccumulator = new Set();
    let dummyVerticalWallsAccumulator = new Set();
    let dummyHorizontalWallsAccumulator = new Set();

    processConnectedCells(
      currentQuarantineStartRow,
      currentQuarantineStartCol,
      initialGrid,
      quarantineProcessTarget,
      quarantineProcessSetter,
      dummyThreatAccumulator,
      dummyVerticalWallsAccumulator,
      dummyHorizontalWallsAccumulator,
      upDownWalls,
      leftRightWalls,
    );

    let spreadSearchTarget = 1;
    let spreadApplyValue = 1;
    let newlyInfectedPositions = new Set();

    for (let spreadScanRow = 0; spreadScanRow < gridHeight; spreadScanRow++) {
      for (let spreadScanCol = 0; spreadScanCol < gridWidth; spreadScanCol++) {
        if (initialGrid[spreadScanRow][spreadScanCol] === 1) {
          processConnectedCells(
            spreadScanRow,
            spreadScanCol,
            initialGrid,
            spreadSearchTarget,
            spreadApplyValue,
            newlyInfectedPositions,
            dummyVerticalWallsAccumulator,
            dummyHorizontalWallsAccumulator,
            upDownWalls,
            leftRightWalls,
          );
        }
      }
    }

    for (let newInfectionSpot of newlyInfectedPositions) {
      initialGrid[Math.floor(newInfectionSpot / gridWidth)][
        newInfectionSpot % gridWidth
      ] = 1;
    }
  }

  return totalWallsInstalled;
};

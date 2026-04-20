/**
 * Cut Off Trees For Golf Event
 * Time Complexity: O(T * R * C)
 * Space Complexity: O(R * C)
 */
const cutOffTree = (forestInput) => {
  const rowCount = forestInput.length;
  const columnCount = forestInput[0].length;

  const treeCoordinates = [];
  for (let rInitial = 0; rInitial < rowCount; rInitial++) {
    for (let cInitial = 0; cInitial < columnCount; cInitial++) {
      if (forestInput[rInitial][cInitial] > 1) {
        treeCoordinates.push([
          forestInput[rInitial][cInitial],
          rInitial,
          cInitial,
        ]);
      }
    }
  }

  treeCoordinates.sort((coordA, coordB) => coordA[0] - coordB[0]);

  let currentCoordinates = [0, 0];
  let totalDistanceAccumulated = 0;

  for (const singleTreeData of treeCoordinates) {
    const targetRowPosition = singleTreeData[1];
    const targetColPosition = singleTreeData[2];

    const pathLengthCalculated = calculateBfsDistance(
      currentCoordinates[0],
      currentCoordinates[1],
      targetRowPosition,
      targetColPosition,
      forestInput,
    );

    if (pathLengthCalculated === -1) {
      return -1;
    }

    totalDistanceAccumulated += pathLengthCalculated;
    currentCoordinates = [targetRowPosition, targetColPosition];
  }

  return totalDistanceAccumulated;
};

const calculateBfsDistance = (
  startRowCoord,
  startColCoord,
  endRowCoord,
  endColCoord,
  gridData,
) => {
  if (startRowCoord === endRowCoord && startColCoord === endColCoord) {
    return 0;
  }

  const gridRows = gridData.length;
  const gridCols = gridData[0].length;

  const movementDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const bfsExplorationQueue = [[startRowCoord, startColCoord, 0]];
  const visitedTracker = new Set();
  visitedTracker.add(`${startRowCoord},${startColCoord}`);

  let advancePointer = 0;

  while (advancePointer < bfsExplorationQueue.length) {
    const [currentRowVisit, currentColVisit, currentTraversalDistance] =
      bfsExplorationQueue[advancePointer++];

    for (const [deltaR, deltaC] of movementDirections) {
      const nextRowVisit = currentRowVisit + deltaR;
      const nextColVisit = currentColVisit + deltaC;

      if (
        nextRowVisit >= 0 &&
        nextRowVisit < gridRows &&
        nextColVisit >= 0 &&
        nextColVisit < gridCols &&
        gridData[nextRowVisit][nextColVisit] !== 0
      ) {
        const uniquePositionKey = `${nextRowVisit},${nextColVisit}`;
        if (!visitedTracker.has(uniquePositionKey)) {
          if (nextRowVisit === endRowCoord && nextColVisit === endColCoord) {
            return currentTraversalDistance + 1;
          }
          visitedTracker.add(uniquePositionKey);
          bfsExplorationQueue.push([
            nextRowVisit,
            nextColVisit,
            currentTraversalDistance + 1,
          ]);
        }
      }
    }
  }

  return -1;
};

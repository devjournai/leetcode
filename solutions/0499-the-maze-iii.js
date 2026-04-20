/**
 * The Maze III
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var findShortestWay = function (maze, ball, hole) {
  const mazeRows = maze.length;
  const mazeColumns = maze[0].length;
  const movementDirections = [
    [-1, 0, "u"],
    [1, 0, "d"],
    [0, -1, "l"],
    [0, 1, "r"],
  ];

  const minPathDistances = new Array(mazeRows)
    .fill(null)
    .map(() => new Array(mazeColumns).fill(Infinity));
  const bestPathStrings = new Array(mazeRows)
    .fill(null)
    .map(() => new Array(mazeColumns).fill("~"));

  const ballStartRow = ball[0];
  const ballStartCol = ball[1];
  const holeTargetRow = hole[0];
  const holeTargetCol = hole[1];

  const travelQueue = [];

  minPathDistances[ballStartRow][ballStartCol] = 0;
  bestPathStrings[ballStartRow][ballStartCol] = "";
  travelQueue.push([0, ballStartRow, ballStartCol, ""]);

  while (travelQueue.length > 0) {
    travelQueue.sort((entryA, entryB) => {
      const distanceA = entryA[0];
      const distanceB = entryB[0];
      const pathA = entryA[3];
      const pathB = entryB[3];

      if (distanceA !== distanceB) {
        return distanceA - distanceB;
      }
      return pathA.localeCompare(pathB);
    });

    const currentEntry = travelQueue.shift();
    const currentPathDistance = currentEntry[0];
    const currentRowPosition = currentEntry[1];
    const currentColPosition = currentEntry[2];
    const currentPathSequence = currentEntry[3];

    if (
      currentRowPosition === holeTargetRow &&
      currentColPosition === holeTargetCol
    ) {
      return currentPathSequence;
    }

    if (
      currentPathDistance >
        minPathDistances[currentRowPosition][currentColPosition] ||
      (currentPathDistance ===
        minPathDistances[currentRowPosition][currentColPosition] &&
        currentPathSequence.localeCompare(
          bestPathStrings[currentRowPosition][currentColPosition],
        ) > 0)
    ) {
      continue;
    }

    for (const singleMove of movementDirections) {
      const deltaRowDirection = singleMove[0];
      const deltaColDirection = singleMove[1];
      const directionChar = singleMove[2];

      let nextProbeRow = currentRowPosition;
      let nextProbeCol = currentColPosition;
      let stepsCount = 0;

      while (true) {
        const potentialNextRow = nextProbeRow + deltaRowDirection;
        const potentialNextCol = nextProbeCol + deltaColDirection;

        const isWallBoundary =
          potentialNextRow < 0 ||
          potentialNextRow >= mazeRows ||
          potentialNextCol < 0 ||
          potentialNextCol >= mazeColumns ||
          maze[potentialNextRow][potentialNextCol] === 1;

        if (isWallBoundary) {
          break;
        }

        nextProbeRow = potentialNextRow;
        nextProbeCol = potentialNextCol;
        stepsCount++;

        if (nextProbeRow === holeTargetRow && nextProbeCol === holeTargetCol) {
          break;
        }
      }

      if (stepsCount > 0) {
        const newTotalDistance = currentPathDistance + stepsCount;
        const newTotalPath = currentPathSequence + directionChar;

        if (
          newTotalDistance < minPathDistances[nextProbeRow][nextProbeCol] ||
          (newTotalDistance === minPathDistances[nextProbeRow][nextProbeCol] &&
            newTotalPath.localeCompare(
              bestPathStrings[nextProbeRow][nextProbeCol],
            ) < 0)
        ) {
          minPathDistances[nextProbeRow][nextProbeCol] = newTotalDistance;
          bestPathStrings[nextProbeRow][nextProbeCol] = newTotalPath;
          travelQueue.push([
            newTotalDistance,
            nextProbeRow,
            nextProbeCol,
            newTotalPath,
          ]);
        }
      }
    }
  }

  return "impossible";
};

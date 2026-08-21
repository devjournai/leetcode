/**
 * Minimum Moves To Move A Box To Their Target Location
 * Intuition: Only box pushes count. BFS over (box, player) states; a push is legal if the player can walk to the cell behind the box without crossing the box.
 * Approach: 1. Locate S, B, T. 2. Queue states [boxR, boxC, playerR, playerC, pushes]. 3. For each of 4 push directions, if the destination is in-bounds and not '#', check canPlayerReachPosition to the cell opposite the push. 4. After a push the player sits on the old box cell. 5. Return pushes when the box hits T, else -1.
 * Dry Run: Small grid S next to B, T one push away, no walls
 *   Player already behind the box -> one BFS push, box lands on T, return 1.
 * Time Complexity: O((rows * cols)^3)
 * Space Complexity: O((rows * cols)^2)
 */
var minPushBox = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  let initialPlayerPosition;
  let initialBoxPosition;
  let targetLocation;

  for (let rowIterator = 0; rowIterator < gridRows; rowIterator++) {
    for (let colIterator = 0; colIterator < gridCols; colIterator++) {
      if (grid[rowIterator][colIterator] === "S")
        initialPlayerPosition = [rowIterator, colIterator];
      if (grid[rowIterator][colIterator] === "B")
        initialBoxPosition = [rowIterator, colIterator];
      if (grid[rowIterator][colIterator] === "T")
        targetLocation = [rowIterator, colIterator];
    }
  }

  const boxMovementQueue = [
    [
      initialBoxPosition[0],
      initialBoxPosition[1],
      initialPlayerPosition[0],
      initialPlayerPosition[1],
      0,
    ],
  ];
  const visitedBoxPlayerStates = new Set();
  visitedBoxPlayerStates.add(
    `${initialBoxPosition[0]}-${initialBoxPosition[1]}-${initialPlayerPosition[0]}-${initialPlayerPosition[1]}`
  );

  const moveDirectionOffsets = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const canPlayerReachPosition = (
    startPlayerCoords,
    destinationPlayerCoords,
    currentBoxCoords
  ) => {
    const playerPathfindingQueue = [
      [startPlayerCoords[0], startPlayerCoords[1]],
    ];
    const playerVisitedGridCells = new Set();
    playerVisitedGridCells.add(
      `${startPlayerCoords[0]}-${startPlayerCoords[1]}`
    );

    let playerQueueReadIndex = 0;

    while (playerQueueReadIndex < playerPathfindingQueue.length) {
      const [currentPlayerRowCoordinate, currentPlayerColCoordinate] =
        playerPathfindingQueue[playerQueueReadIndex++];

      if (
        currentPlayerRowCoordinate === destinationPlayerCoords[0] &&
        currentPlayerColCoordinate === destinationPlayerCoords[1]
      ) {
        return true;
      }

      for (const [rowDelta, colDelta] of moveDirectionOffsets) {
        const nextPlayerRowCoordinate = currentPlayerRowCoordinate + rowDelta;
        const nextPlayerColCoordinate = currentPlayerColCoordinate + colDelta;

        const nextPlayerLocationKey = `${nextPlayerRowCoordinate}-${nextPlayerColCoordinate}`;

        if (
          nextPlayerRowCoordinate < 0 ||
          nextPlayerRowCoordinate >= gridRows ||
          nextPlayerColCoordinate < 0 ||
          nextPlayerColCoordinate >= gridCols ||
          grid[nextPlayerRowCoordinate][nextPlayerColCoordinate] === "#"
        ) {
          continue;
        }
        if (
          nextPlayerRowCoordinate === currentBoxCoords[0] &&
          nextPlayerColCoordinate === currentBoxCoords[1]
        ) {
          continue;
        }
        if (playerVisitedGridCells.has(nextPlayerLocationKey)) {
          continue;
        }

        playerVisitedGridCells.add(nextPlayerLocationKey);
        playerPathfindingQueue.push([
          nextPlayerRowCoordinate,
          nextPlayerColCoordinate,
        ]);
      }
    }
    return false;
  };

  let boxQueueCurrentIndex = 0;

  while (boxQueueCurrentIndex < boxMovementQueue.length) {
    const [
      currentBoxRowPosition,
      currentBoxColPosition,
      currentPlayerRowPosition,
      currentPlayerColPosition,
      currentTotalPushes,
    ] = boxMovementQueue[boxQueueCurrentIndex++];

    if (
      currentBoxRowPosition === targetLocation[0] &&
      currentBoxColPosition === targetLocation[1]
    ) {
      return currentTotalPushes;
    }

    for (const [
      directionRowOffset,
      directionColOffset,
    ] of moveDirectionOffsets) {
      const potentialNextBoxRow = currentBoxRowPosition + directionRowOffset;
      const potentialNextBoxCol = currentBoxColPosition + directionColOffset;

      if (
        potentialNextBoxRow < 0 ||
        potentialNextBoxRow >= gridRows ||
        potentialNextBoxCol < 0 ||
        potentialNextBoxCol >= gridCols ||
        grid[potentialNextBoxRow][potentialNextBoxCol] === "#"
      ) {
        continue;
      }

      const playerRequiredRowToPush =
        currentBoxRowPosition - directionRowOffset;
      const playerRequiredColToPush =
        currentBoxColPosition - directionColOffset;

      if (
        !canPlayerReachPosition(
          [currentPlayerRowPosition, currentPlayerColPosition],
          [playerRequiredRowToPush, playerRequiredColToPush],
          [currentBoxRowPosition, currentBoxColPosition]
        )
      ) {
        continue;
      }

      const playerNewRowAfterPush = currentBoxRowPosition;
      const playerNewColAfterPush = currentBoxColPosition;

      const nextConfigurationIdentifier = `${potentialNextBoxRow}-${potentialNextBoxCol}-${playerNewRowAfterPush}-${playerNewColAfterPush}`;

      if (visitedBoxPlayerStates.has(nextConfigurationIdentifier)) {
        continue;
      }

      visitedBoxPlayerStates.add(nextConfigurationIdentifier);
      boxMovementQueue.push([
        potentialNextBoxRow,
        potentialNextBoxCol,
        playerNewRowAfterPush,
        playerNewColAfterPush,
        currentTotalPushes + 1,
      ]);
    }
  }

  return -1;
};

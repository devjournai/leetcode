/**
 * Minimum Path Cost In A Hidden Grid
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var findShortestPath = function (master) {
  const possibleMoves = ["U", "D", "L", "R"];
  const returnMoves = { U: "D", D: "U", L: "R", R: "L" };
  const movementDeltas = { U: [-1, 0], D: [1, 0], L: [0, -1], R: [0, 1] };
  const visitedMap = new Set();
  const costsGrid = new Map();
  let finalTargetCoordinates = null;

  costsGrid.set("0,0", 0);
  exploreGridDfs(0, 0);

  if (!finalTargetCoordinates) {
    return -1;
  }

  const processedPathCells = new Set();
  const pathQueue = new PriorityQueue(
    (elementA, elementB) => elementA[2] - elementB[2],
  );
  pathQueue.enqueue([0, 0, 0]);

  while (!pathQueue.isEmpty()) {
    const currentPathElement = pathQueue.dequeue();
    const currentPathRow = currentPathElement[0];
    const currentPathCol = currentPathElement[1];
    const currentPathCost = currentPathElement[2];
    const currentCellIdentifier = `${currentPathRow},${currentPathCol}`;

    if (processedPathCells.has(currentCellIdentifier)) {
      continue;
    }
    processedPathCells.add(currentCellIdentifier);

    if (
      currentPathRow === finalTargetCoordinates[0] &&
      currentPathCol === finalTargetCoordinates[1]
    ) {
      return currentPathCost;
    }

    for (const nextMoveDirection of possibleMoves) {
      const [deltaRowMovement, deltaColMovement] =
        movementDeltas[nextMoveDirection];
      const nextVisitedRow = currentPathRow + deltaRowMovement;
      const nextVisitedCol = currentPathCol + deltaColMovement;
      const nextVisitedKey = `${nextVisitedRow},${nextVisitedCol}`;

      if (
        costsGrid.has(nextVisitedKey) &&
        !processedPathCells.has(nextVisitedKey)
      ) {
        const potentialNewCost =
          currentPathCost + costsGrid.get(nextVisitedKey);
        pathQueue.enqueue([nextVisitedRow, nextVisitedCol, potentialNewCost]);
      }
    }
  }

  return -1;

  function exploreGridDfs(presentRow, presentCol) {
    const presentCellKey = `${presentRow},${presentCol}`;
    if (visitedMap.has(presentCellKey)) {
      return;
    }

    visitedMap.add(presentCellKey);

    if (master.isTarget()) {
      finalTargetCoordinates = [presentRow, presentCol];
    }

    for (const directionToExplore of possibleMoves) {
      if (master.canMove(directionToExplore)) {
        const moveResultCost = master.move(directionToExplore);
        if (moveResultCost !== -1) {
          const [dr, dc] = movementDeltas[directionToExplore];
          const nextDfsRow = presentRow + dr;
          const nextDfsCol = presentCol + dc;
          const nextDfsKey = `${nextDfsRow},${nextDfsCol}`;

          if (!costsGrid.has(nextDfsKey)) {
            costsGrid.set(nextDfsKey, moveResultCost);
          }

          exploreGridDfs(nextDfsRow, nextDfsCol);

          master.move(returnMoves[directionToExplore]);
        }
      }
    }
  }
};

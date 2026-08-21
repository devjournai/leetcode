/**
 * Shortest Path In A Hidden Grid
 * Intuition: The grid is hidden, so first DFS with the master API maps every reachable empty cell and records the target. Then BFS on that discovered graph yields the shortest path length.
 * Approach: 1. `exploreGrid` marks `reachableCells`, backtracks with opposite moves, and stores `finalTargetLocation` when `master.isTarget()`. 2. If no target, return -1. 3. BFS from (0,0) over reachable unvisited neighbors. 4. Return distance when the target is dequeued.
 * Dry Run: start (0,0), target two steps right with open cells.
 *   - DFS records (0,0),(1,0),(2,0) and target (2,0). BFS distances 0,1,2 → return 2.
 * Time Complexity: O(R)
 * Space Complexity: O(R)
 */
var findShortestPath = function (master) {
  const allRobotDirections = [
    ["U", "D", 0, -1],
    ["D", "U", 0, 1],
    ["L", "R", -1, 0],
    ["R", "L", 1, 0],
  ];

  const reachableCells = new Set();
  let finalTargetLocation = null;

  function exploreGrid(currentRobotX, currentRobotY) {
    const currentCellKey = `${currentRobotX},${currentRobotY}`;
    if (reachableCells.has(currentCellKey)) {
      return;
    }
    reachableCells.add(currentCellKey);

    if (master.isTarget()) {
      finalTargetLocation = [currentRobotX, currentRobotY];
      return;
    }

    for (const [
      moveCommand,
      returnCommand,
      changeX,
      changeY,
    ] of allRobotDirections) {
      if (master.canMove(moveCommand)) {
        master.move(moveCommand);
        exploreGrid(currentRobotX + changeX, currentRobotY + changeY);
        master.move(returnCommand);
      }
    }
  }

  exploreGrid(0, 0);

  if (!finalTargetLocation) {
    return -1;
  }

  const bfsTraversalQueue = [[0, 0, 0]];
  const bfsVisitedPath = new Set(["0,0"]);

  const targetCoordinateX = finalTargetLocation[0];
  const targetCoordinateY = finalTargetLocation[1];

  const cardinalMovementVectors = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];

  while (bfsTraversalQueue.length > 0) {
    const [currentQueueX, currentQueueY, currentPathDistance] =
      bfsTraversalQueue.shift();

    if (
      currentQueueX === targetCoordinateX &&
      currentQueueY === targetCoordinateY
    ) {
      return currentPathDistance;
    }

    for (
      let directionIndex = 0;
      directionIndex < cardinalMovementVectors.length;
      ++directionIndex
    ) {
      const [offsetX, offsetY] = cardinalMovementVectors[directionIndex];
      const nextCellX = currentQueueX + offsetX;
      const nextCellY = currentQueueY + offsetY;
      const nextCellKeyString = `${nextCellX},${nextCellY}`;

      if (
        !bfsVisitedPath.has(nextCellKeyString) &&
        reachableCells.has(nextCellKeyString)
      ) {
        bfsVisitedPath.add(nextCellKeyString);
        bfsTraversalQueue.push([nextCellX, nextCellY, currentPathDistance + 1]);
      }
    }
  }

  return -1;
};

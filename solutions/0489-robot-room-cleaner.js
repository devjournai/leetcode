/**
 * Robot Room Cleaner
 * Intuition: The grid is unknown, so DFS from (0,0) in robot-relative coordinates. After cleaning a cell, try four directions: `move()` into an unvisited neighbor, recurse, then turn 180°, step back, and turn 180° again to restore heading; always `turnRight` to try the next heading.
 * Approach: 1. `visitedLocations` keys `"r,c"`; `directionVectors` are up, right, down, left. 2. `exploreAndClean(row, col, heading)` returns if visited; else mark, `robot.clean()`. 3. Four times: candidate heading = (current + i) % 4; if `robot.move()`, recurse at the new cell with that heading, then backtrack with two right turns, `move`, two left turns; then `turnRight` to rotate in place. 4. Start at (0,0,0).
 * Dry Run: 1×2 open cells, start left cell facing up.
 *   - Clean (0,0). Turns until `move()` succeeds into (0,1), clean it, backtrack to (0,0). Further moves hit walls. Done.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var cleanRoom = function (robot) {
  const visitedLocations = new Set();
  const directionVectors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  exploreAndClean(0, 0, 0);

  function exploreAndClean(
    currentRowPosition,
    currentColumnPosition,
    currentDirectionState
  ) {
    const cellIdentifier = `${currentRowPosition},${currentColumnPosition}`;
    if (visitedLocations.has(cellIdentifier)) {
      return;
    }

    visitedLocations.add(cellIdentifier);
    robot.clean();

    for (let iterationCounter = 0; iterationCounter < 4; iterationCounter++) {
      const nextAbsoluteDirection =
        (currentDirectionState + iterationCounter) % 4;
      const [deltaRowMovement, deltaColumnMovement] =
        directionVectors[nextAbsoluteDirection];
      const nextRowCoordinate = currentRowPosition + deltaRowMovement;
      const nextColumnCoordinate = currentColumnPosition + deltaColumnMovement;

      if (robot.move()) {
        exploreAndClean(
          nextRowCoordinate,
          nextColumnCoordinate,
          nextAbsoluteDirection
        );

        robot.turnRight();
        robot.turnRight();
        robot.move();
        robot.turnLeft();
        robot.turnLeft();
      }
      robot.turnRight();
    }
  }
};

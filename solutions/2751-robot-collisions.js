/**
 * Robot Collisions
 * Intuition: After sorting by position, only a right-going robot can collide with a later left-going one. A stack of survivors simulates the chain of collisions.
 * Approach: 1. Pair each robot with index, position, health, direction and sort by position. 2. Push R robots. 3. For an L robot, collide with stack-top R robots: equal health both die, larger health loses 1, smaller is popped. 4. Collect remaining healths in original index order.
 * Dry Run: positions=[3,5,2,6], healths=[10,10,15,12], directions="RLRL". Sorted: 2(R,15), 3(R,10), 5(L,10), 6(L,12). 5(L) ties 3(R) and both die. 6(L) hits 2(R,15): 15>12 so health becomes 14. Output [14].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var survivedRobotsHealths = function (positions, healths, directions) {
  const totalRobotCount = positions.length;
  const detailedRobots = Array.from(
    { length: totalRobotCount },
    (_, robotIndex) => ({
      originalIndex: robotIndex,
      currentPosition: positions[robotIndex],
      currentHealth: healths[robotIndex],
      movementDirection: directions[robotIndex],
    })
  );

  detailedRobots.sort(
    (firstRobot, secondRobot) =>
      firstRobot.currentPosition - secondRobot.currentPosition
  );

  const collisionProcessingStack = [];
  for (const currentProcessingRobot of detailedRobots) {
    if (currentProcessingRobot.movementDirection === "R") {
      collisionProcessingStack.push(currentProcessingRobot);
      continue;
    }

    while (
      collisionProcessingStack.length > 0 &&
      collisionProcessingStack[collisionProcessingStack.length - 1]
        .movementDirection === "R" &&
      currentProcessingRobot.currentHealth > 0
    ) {
      const stackTopRobot =
        collisionProcessingStack[collisionProcessingStack.length - 1];

      if (
        stackTopRobot.currentHealth === currentProcessingRobot.currentHealth
      ) {
        collisionProcessingStack.pop();
        currentProcessingRobot.currentHealth = 0;
      } else if (
        stackTopRobot.currentHealth > currentProcessingRobot.currentHealth
      ) {
        stackTopRobot.currentHealth--;
        currentProcessingRobot.currentHealth = 0;
      } else {
        // stackTopRobot.currentHealth < currentProcessingRobot.currentHealth
        collisionProcessingStack.pop();
        currentProcessingRobot.currentHealth--;
      }
    }

    if (currentProcessingRobot.currentHealth > 0) {
      collisionProcessingStack.push(currentProcessingRobot);
    }
  }

  const outputHealths = new Array(totalRobotCount).fill(0);
  for (const survivorRobot of collisionProcessingStack) {
    outputHealths[survivorRobot.originalIndex] = survivorRobot.currentHealth;
  }

  return outputHealths.filter((presentHealthValue) => presentHealthValue > 0);
};

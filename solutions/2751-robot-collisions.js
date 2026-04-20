/**
 * Robot Collisions
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
    }),
  );

  detailedRobots.sort(
    (firstRobot, secondRobot) =>
      firstRobot.currentPosition - secondRobot.currentPosition,
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

/**
 * Walking Robot Simulation
 * Time Complexity: O(M + N * K)
 * Space Complexity: O(M)
 */
var robotSim = function (inputCommands, gridObstacles) {
  const cardinalDirections = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const blockedLocationsSet = new Set(
    gridObstacles.map(([obstacleX, obstacleY]) => `${obstacleX},${obstacleY}`),
  );

  let currentRobotX = 0;
  let currentRobotY = 0;
  let robotHeadingIndex = 0;
  let maxEuclideanDistanceSquared = 0;

  for (
    let instructionPointer = 0;
    instructionPointer < inputCommands.length;
    instructionPointer++
  ) {
    const currentInstruction = inputCommands[instructionPointer];

    switch (currentInstruction) {
      case -1:
        robotHeadingIndex = (robotHeadingIndex + 1) % 4;
        break;
      case -2:
        robotHeadingIndex = (robotHeadingIndex + 3) % 4;
        break;
      default:
        const [deltaMoveX, deltaMoveY] = cardinalDirections[robotHeadingIndex];
        let unitsAdvanced = 0;
        let obstacleWasHit = false;

        while (unitsAdvanced < currentInstruction && !obstacleWasHit) {
          const nextProspectiveX = currentRobotX + deltaMoveX;
          const nextProspectiveY = currentRobotY + deltaMoveY;

          if (
            blockedLocationsSet.has(`${nextProspectiveX},${nextProspectiveY}`)
          ) {
            obstacleWasHit = true;
          } else {
            currentRobotX = nextProspectiveX;
            currentRobotY = nextProspectiveY;
            maxEuclideanDistanceSquared = Math.max(
              maxEuclideanDistanceSquared,
              currentRobotX * currentRobotX + currentRobotY * currentRobotY,
            );
          }
          unitsAdvanced++;
        }
        break;
    }
  }

  return maxEuclideanDistanceSquared;
};

/**
 * Walking Robot Simulation
 * Intuition: Simulate facing north with `cardinalDirections` (N,E,S,W). Commands -1/-2 rotate; positive values try to step that many units, stopping just before an obstacle hashed as `"x,y"`. Track max `x²+y²`.
 * Approach: 1. Put obstacles in `blockedLocationsSet`. 2. Start at (0,0), heading 0. 3. For each command: -1 → `(heading+1)%4`; -2 → `(heading+3)%4`; else walk unit-by-unit until the command length or a blocked next cell. 4. After each successful step, update `maxEuclideanDistanceSquared`. 5. Return that max.
 * Dry Run: commands = [4, -1, 3], obstacles = [].
 *   - Walk north 4 → (0,4), max 16. Turn right (east). Walk 3 → (3,4), max 9+16=25. Return 25.
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
    gridObstacles.map(([obstacleX, obstacleY]) => `${obstacleX},${obstacleY}`)
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
              currentRobotX * currentRobotX + currentRobotY * currentRobotY
            );
          }
          unitsAdvanced++;
        }
        break;
    }
  }

  return maxEuclideanDistanceSquared;
};

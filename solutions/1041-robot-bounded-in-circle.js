/**
 * Robot Bounded In Circle
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var isRobotBounded = function (instructionsPayload) {
  let robotPositionX = 0;
  let robotPositionY = 0;
  let robotDirectionX = 0;
  let robotDirectionY = 1;

  for (const instructionChar of instructionsPayload) {
    switch (instructionChar) {
      case "G":
        robotPositionX += robotDirectionX;
        robotPositionY += robotDirectionY;
        break;
      case "L":
        [robotDirectionX, robotDirectionY] = [
          -robotDirectionY,
          robotDirectionX,
        ];
        break;
      case "R":
        [robotDirectionX, robotDirectionY] = [
          robotDirectionY,
          -robotDirectionX,
        ];
        break;
    }
  }

  const returnsToStartingPoint = robotPositionX === 0 && robotPositionY === 0;
  const doesNotFaceNorth = robotDirectionY !== 1;

  return returnsToStartingPoint || doesNotFaceNorth;
};

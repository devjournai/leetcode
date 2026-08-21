/**
 * Robot Bounded In Circle
 * Intuition: After one cycle the robot is bounded iff it is back at the origin or no longer facing north (so repeats will rotate and close).
 * Approach: 1. Start at (0,0) facing (0,1). 2. G moves by the direction; L/R rotate the direction vector. 3. Return true if position is origin or direction is not north.
 * Dry Run: instructions = "GGLLGG".
 *   - Two G north to (0,2), two L face south, two G to (0,0). Origin -> true.
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

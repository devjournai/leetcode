/**
 * Walking Robot Simulation II
 * Intuition: The robot only walks the rectangle border, so steps wrap around the perimeter. Direction stays East until the first move.
 * Approach: 1. Store perimeter = 2*(width+height-2). 2. Reduce steps modulo perimeter (full laps leave the robot at the same spot, so treat 0 as a full lap). 3. Walk toward the next wall, turn left at corners. 4. getDir returns East until any step has run.
 * Dry Run: width=4, height=3. step(1) from (0,0) East -> (1,0) East. step(3): walk to (3,0), turn North, one more step to (3,1) North.
 * Time Complexity: O(width + height)
 * Space Complexity: O(1)
 */
var Robot = function (width, height) {
  this.gridWidth = width;
  this.gridHeight = height;
  this.robotXCoordinate = 0;
  this.robotYCoordinate = 0;
  this.directionPointer = 0;
  this.directionNames = ["East", "North", "West", "South"];
  this.directionDisplacements = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  this.totalPerimeter = 2 * (width + height - 2);
  this.movedFromInitialPosition = false;
};

Robot.prototype.step = function (num) {
  if (num === 0) {
    return;
  }

  this.movedFromInitialPosition = true;

  let stepsToAdvance = num;
  let adjustedSteps = stepsToAdvance % this.totalPerimeter;

  if (adjustedSteps === 0) {
    adjustedSteps = this.totalPerimeter;
  }

  while (adjustedSteps > 0) {
    const [currentDx, currentDy] =
      this.directionDisplacements[this.directionPointer];
    const currentRobotCoordX = this.robotXCoordinate;
    const currentRobotCoordY = this.robotYCoordinate;
    let remainingDistanceToWall;

    if (this.directionPointer === 0) {
      remainingDistanceToWall = this.gridWidth - 1 - currentRobotCoordX;
    } else if (this.directionPointer === 1) {
      remainingDistanceToWall = this.gridHeight - 1 - currentRobotCoordY;
    } else if (this.directionPointer === 2) {
      remainingDistanceToWall = currentRobotCoordX;
    } else {
      remainingDistanceToWall = currentRobotCoordY;
    }

    if (remainingDistanceToWall >= adjustedSteps) {
      this.robotXCoordinate = currentRobotCoordX + currentDx * adjustedSteps;
      this.robotYCoordinate = currentRobotCoordY + currentDy * adjustedSteps;
      adjustedSteps = 0;
    } else {
      this.robotXCoordinate =
        currentRobotCoordX + currentDx * remainingDistanceToWall;
      this.robotYCoordinate =
        currentRobotCoordY + currentDy * remainingDistanceToWall;
      this.directionPointer = (this.directionPointer + 1) % 4;
      adjustedSteps -= remainingDistanceToWall;
    }
  }
};

Robot.prototype.getPos = function () {
  return [this.robotXCoordinate, this.robotYCoordinate];
};

Robot.prototype.getDir = function () {
  if (!this.movedFromInitialPosition) {
    return "East";
  }
  return this.directionNames[this.directionPointer];
};

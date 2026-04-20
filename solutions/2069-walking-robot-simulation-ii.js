/**
 * Walking Robot Simulation II
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

/**
 * Design Snake Game
 * Time Complexity: O(L)
 * Space Complexity: O(H * W + F)
 */
var SnakeGame = function (widthParam, heightParam, foodParam) {
  this.boardWidth = widthParam;
  this.boardHeight = heightParam;
  this.foodLocations = foodParam;
  this.nextFoodToEatIndex = 0;
  this.currentScoreValue = 0;

  this.snakeSegmentsList = [[0, 0]];
  this.occupiedCoordinatesSet = new Set(["0,0"]);
};

SnakeGame.prototype.move = function (directionParam) {
  const currentSnakeHead = [...this.snakeSegmentsList[0]];
  let newHeadRow = currentSnakeHead[0];
  let newHeadColumn = currentSnakeHead[1];

  switch (directionParam) {
    case "U":
      newHeadRow--;
      break;
    case "D":
      newHeadRow++;
      break;
    case "L":
      newHeadColumn--;
      break;
    case "R":
      newHeadColumn++;
      break;
  }

  const boundaryCondition =
    newHeadRow < 0 ||
    newHeadRow >= this.boardHeight ||
    newHeadColumn < 0 ||
    newHeadColumn >= this.boardWidth;
  if (boundaryCondition) {
    return -1;
  }

  const removedTailPiece = this.snakeSegmentsList.pop();
  const removedTailKeyString = `${removedTailPiece[0]},${removedTailPiece[1]}`;
  this.occupiedCoordinatesSet.delete(removedTailKeyString);

  const newHeadKeyString = `${newHeadRow},${newHeadColumn}`;
  const selfCollisionCondition =
    this.occupiedCoordinatesSet.has(newHeadKeyString);
  if (selfCollisionCondition) {
    return -1;
  }

  this.snakeSegmentsList.unshift([newHeadRow, newHeadColumn]);
  this.occupiedCoordinatesSet.add(newHeadKeyString);

  const foodAvailableAndReached =
    this.nextFoodToEatIndex < this.foodLocations.length &&
    newHeadRow === this.foodLocations[this.nextFoodToEatIndex][0] &&
    newHeadColumn === this.foodLocations[this.nextFoodToEatIndex][1];

  if (foodAvailableAndReached) {
    this.snakeSegmentsList.push(removedTailPiece);
    this.occupiedCoordinatesSet.add(removedTailKeyString);
    this.nextFoodToEatIndex++;
    this.currentScoreValue++;
  }

  return this.currentScoreValue;
};

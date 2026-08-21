/**
 * Design Snake Game
 * Intuition: Keep the body as a head-first coordinate list and an occupancy set. Move by proposing a new head, temporarily dropping the tail so the snake can crawl into the cell it just vacated, then grow the tail back if that move lands on food.
 * Approach: 1. Constructor stores board size, food list, score, body `[[0,0]]`, and set `"0,0"`. 2. `move` shifts the head by U/D/L/R, returns -1 on out-of-bounds. 3. Pop the tail and unmark it, then return -1 if the new head is still occupied. 4. Unshift the new head; if it matches the next food, push the tail back, remake occupancy, and increment score/food index.
 * Dry Run: 2x2 board, food [[1,0]]. Move D: new head (1,0) in bounds, tail (0,0) removed then restored as food → score 1, body [(1,0),(0,0)].
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

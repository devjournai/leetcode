/**
 * Flatten 2d Vector
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var Vector2D = function (inputTwoDArray) {
  this.storedTwoDVector = inputTwoDArray;
  this.currentTraversalRow = 0;
  this.currentTraversalColumn = 0;
};

Vector2D.prototype.preparePointers = function () {
  while (
    this.currentTraversalRow < this.storedTwoDVector.length &&
    this.currentTraversalColumn >=
      this.storedTwoDVector[this.currentTraversalRow].length
  ) {
    this.currentTraversalRow++;
    this.currentTraversalColumn = 0;
  }
};

Vector2D.prototype.next = function () {
  this.preparePointers();
  const nextItem =
    this.storedTwoDVector[this.currentTraversalRow][
      this.currentTraversalColumn
    ];
  this.currentTraversalColumn++;
  return nextItem;
};

Vector2D.prototype.hasNext = function () {
  this.preparePointers();
  return this.currentTraversalRow < this.storedTwoDVector.length;
};

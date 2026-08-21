/**
 * Flatten 2d Vector
 * Intuition: Iterate the 2D list with a (row, col) cursor. Skip empty inner arrays by advancing the row whenever the column is past that row’s length.
 * Approach: 1. Store the vector and start at (0,0). 2. `preparePointers` while row is in range and col ≥ that row’s length: row++, col=0. 3. `next` prepares, returns the cell, then col++. 4. `hasNext` prepares and checks row still in range. Per call work is treated as O(1) extra space.
 * Dry Run: vec = [[], [1,2], [3]].
 *   - hasNext: skip empty row 0, land on 1. next → 1, then 2, then 3. hasNext false.
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

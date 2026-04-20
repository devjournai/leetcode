/**
 * Design A Stack With Increment Operation
 * Time Complexity: O(1)
 * Space Complexity: O(maxSize)
 */
var CustomStack = function (maxSize) {
  this.stackStorage = [];
  this.maximumSize = maxSize;
};

CustomStack.prototype.push = function (x) {
  let currentCapacity = this.stackStorage.length;
  if (currentCapacity < this.maximumSize) {
    let newValue = x;
    this.stackStorage.push(newValue);
  }
};

CustomStack.prototype.pop = function () {
  let currentItemsCount = this.stackStorage.length;
  if (currentItemsCount > 0) {
    let poppedValue = this.stackStorage.pop();
    return poppedValue;
  } else {
    let emptyResult = -1;
    return emptyResult;
  }
};

CustomStack.prototype.increment = function (k, val) {
  let incrementCount = k;
  let incrementValue = val;
  let currentStackSize = this.stackStorage.length;

  let effectiveLimit = Math.min(incrementCount, currentStackSize);

  for (
    let iterationIndex = 0;
    iterationIndex < effectiveLimit;
    iterationIndex++
  ) {
    this.stackStorage[iterationIndex] += incrementValue;
  }
};

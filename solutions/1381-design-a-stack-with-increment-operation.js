/**
 * Design A Stack With Increment Operation
 * Intuition: Store values in an array capped at maxSize. Push/pop are ordinary; increment walks the bottom min(k, size) slots.
 * Approach: 1. Constructor stores [] and maxSize. 2. push appends only if length < maxSize. 3. pop returns the last value or -1. 4. increment adds val to indices [0, min(k, length)).
 * Dry Run: CustomStack(3); push 1, 2; increment(2, 100); pop.
 *   - Stack [1,2] → [101,102] → pop 102. Next pop 101.
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

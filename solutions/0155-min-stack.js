/**
 * Min Stack
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var MinStack = function () {
  this.elementStorage = [];
};

MinStack.prototype.push = function (val) {
  let pushedItemValue = val;
  let currentOverallMinimum;

  if (this.elementStorage.length === 0) {
    currentOverallMinimum = pushedItemValue;
  } else {
    let lastElementData = this.elementStorage[this.elementStorage.length - 1];
    let previousMinTracked = lastElementData.minimumValueAtAddition;
    currentOverallMinimum = Math.min(pushedItemValue, previousMinTracked);
  }

  this.elementStorage.push({
    actualValue: pushedItemValue,
    minimumValueAtAddition: currentOverallMinimum,
  });
};

MinStack.prototype.pop = function () {
  this.elementStorage.pop();
};

MinStack.prototype.top = function () {
  let topStackEntry = this.elementStorage[this.elementStorage.length - 1];
  return topStackEntry.actualValue;
};

MinStack.prototype.getMin = function () {
  if (this.elementStorage.length === 0) {
    return 0;
  }
  let currentMinEntry = this.elementStorage[this.elementStorage.length - 1];
  return currentMinEntry.minimumValueAtAddition;
};

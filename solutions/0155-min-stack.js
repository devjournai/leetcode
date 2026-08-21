/**
 * Min Stack
 * Intuition: The current minimum only changes on push/pop, so each stack entry can store both its value and the minimum of the stack at the time it was pushed. `getMin` then reads the top entry's stored min.
 * Approach: 1. `elementStorage` is an array of `{actualValue, minimumValueAtAddition}`. 2. `push`: min is `val` if empty, else `Math.min(val, previousMinTracked)`; push both fields. 3. `pop` pops the array. 4. `top` returns `actualValue`. 5. `getMin` returns 0 if empty else the top's `minimumValueAtAddition`.
 * Dry Run: push(-2), push(0), push(-3)
 * Entries: (-2,min=-2), (0,min=-2), (-3,min=-3)
 * getMin → -3; pop; getMin → -2
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

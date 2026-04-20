/**
 * Insert Delete Getrandom O1
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var RandomizedSet = function () {
  this.valueToIndexMap = new Map();
  this.elementList = [];
};

RandomizedSet.prototype.insert = function (val) {
  if (this.valueToIndexMap.has(val)) {
    return false;
  }

  this.elementList.push(val);
  let newIndexPosition = this.elementList.length - 1;
  this.valueToIndexMap.set(val, newIndexPosition);
  return true;
};

RandomizedSet.prototype.remove = function (val) {
  if (!this.valueToIndexMap.has(val)) {
    return false;
  }

  let indexOfElementToRemove = this.valueToIndexMap.get(val);
  let lastElementValue = this.elementList[this.elementList.length - 1];

  this.elementList[indexOfElementToRemove] = lastElementValue;
  this.valueToIndexMap.set(lastElementValue, indexOfElementToRemove);

  this.elementList.pop();
  this.valueToIndexMap.delete(val);
  return true;
};

RandomizedSet.prototype.getRandom = function () {
  let currentSetSize = this.elementList.length;
  let randomChosenIndex = Math.floor(Math.random() * currentSetSize);
  return this.elementList[randomChosenIndex];
};

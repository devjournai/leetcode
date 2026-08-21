/**
 * Insert Delete Getrandom O1
 * Intuition: An array gives O(1) random access; a value→index map gives O(1) insert/lookup. Removal swaps the target with the last element so we can pop instead of shifting.
 * Approach: 1. `insert` rejects duplicates, pushes, and maps the new index. 2. `remove` copies the last value onto the hole, updates that value’s index, pops, and deletes the map entry. 3. `getRandom` indexes `elementList` with `Math.random()`.
 * Dry Run: insert 1, insert 2 (list [1,2]). remove 1 swaps 2 into index 0, pops → [2]; getRandom always 2.
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

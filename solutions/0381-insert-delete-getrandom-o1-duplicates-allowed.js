/**
 * Insert Delete Getrandom O1 Duplicates Allowed
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var RandomizedCollection = function () {
  this.elementArray = [];
  this.elementToIndices = new Map();
};

RandomizedCollection.prototype.insert = function (valueEntry) {
  let initialPresence = false;
  if (!this.elementToIndices.has(valueEntry)) {
    this.elementToIndices.set(valueEntry, new Set());
    initialPresence = true;
  }

  let currentIndicesSet = this.elementToIndices.get(valueEntry);
  currentIndicesSet.add(this.elementArray.length);
  this.elementArray.push(valueEntry);

  return initialPresence;
};

RandomizedCollection.prototype.remove = function (valueToRemove) {
  if (!this.elementToIndices.has(valueToRemove)) {
    return false;
  }

  let availableIndices = this.elementToIndices.get(valueToRemove);
  let indexForRemoval = availableIndices.values().next().value;

  let lastElementValue = this.elementArray[this.elementArray.length - 1];
  let lastElementCurrentIndex = this.elementArray.length - 1;

  availableIndices.delete(indexForRemoval);

  if (indexForRemoval !== lastElementCurrentIndex) {
    this.elementArray[indexForRemoval] = lastElementValue;
    let lastElementIndices = this.elementToIndices.get(lastElementValue);
    lastElementIndices.delete(lastElementCurrentIndex);
    lastElementIndices.add(indexForRemoval);
  }

  this.elementArray.pop();

  if (availableIndices.size === 0) {
    this.elementToIndices.delete(valueToRemove);
  }

  return true;
};

RandomizedCollection.prototype.getRandom = function () {
  let randomArrayIndex = Math.floor(Math.random() * this.elementArray.length);
  return this.elementArray[randomArrayIndex];
};

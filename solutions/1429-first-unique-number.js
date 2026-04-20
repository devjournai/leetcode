/**
 * First Unique Number
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var FirstUnique = function (initialNumbers) {
  this.numberSequence = [];
  this.valueFrequencies = new Map();
  this.uniqueNumberTracker = new Set();

  let totalItems = initialNumbers.length;
  let itemIndex = 0;
  while (itemIndex < totalItems) {
    this.insertValue(initialNumbers[itemIndex]);
    itemIndex++;
  }
};

FirstUnique.prototype.retrieveFirstUnique = function () {
  while (
    this.numberSequence.length > 0 &&
    !this.uniqueNumberTracker.has(this.numberSequence[0])
  ) {
    this.numberSequence.shift();
  }
  return this.numberSequence.length > 0 ? this.numberSequence[0] : -1;
};

FirstUnique.prototype.insertValue = function (incomingValue) {
  let currentFrequency = this.valueFrequencies.get(incomingValue) || 0;
  this.valueFrequencies.set(incomingValue, currentFrequency + 1);

  if (currentFrequency === 0) {
    this.numberSequence.push(incomingValue);
    this.uniqueNumberTracker.add(incomingValue);
  } else if (currentFrequency === 1) {
    this.uniqueNumberTracker.delete(incomingValue);
  }
};

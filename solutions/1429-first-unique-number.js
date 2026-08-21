/**
 * First Unique Number
 * Intuition: Keep insertion order in a queue, frequencies in a map, and currently unique values in a set. showFirstUnique drains the queue until the front is still unique.
 * Approach: 1. Constructor inserts every initial number via insertValue. 2. insertValue bumps frequency; first sighting queues the value and adds it to the unique set; second sighting removes it from the set. 3. retrieveFirstUnique shifts stale non-unique fronts, then returns the front or -1.
 * Dry Run: FirstUnique([2,3,5]), then insert 5, then insert 2, then retrieve
 *   - after init: queue [2,3,5], unique {2,3,5}
 *   - insert 5: unique {2,3}
 *   - insert 2: unique {3}
 *   - retrieve: skip 2, return 3
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

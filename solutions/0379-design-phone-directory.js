/**
 * Design Phone Directory
 * Intuition: Fresh numbers are handed out in order until capacity; released numbers sit in a recycle set and are reused first. Availability is “never issued yet” or “currently in the freed set”.
 * Approach: 1. Track `nextSequentialNumber`, `freedNumbers`, `activeNumbers`. 2. `get` pops a freed slot if any, else issues the next sequential id, else -1. 3. `check` is true for in-range ids that are freed or ≥ nextSequential. 4. `release` moves an active id into freed.
 * Dry Run: max=3. get→0, get→1, release(0), check(0) true, get→0.
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var PhoneDirectory = function (maxNumbers) {
  this.totalCapacity = maxNumbers;
  this.nextSequentialNumber = 0;
  this.freedNumbers = new Set();
  this.activeNumbers = new Set();
};

PhoneDirectory.prototype.get = function () {
  let assignedSlot;

  if (this.freedNumbers.size > 0) {
    const setIterator = this.freedNumbers.values();
    const firstValue = setIterator.next().value;
    assignedSlot = firstValue;
    this.freedNumbers.delete(firstValue);
    this.activeNumbers.add(assignedSlot);
    return assignedSlot;
  } else if (this.nextSequentialNumber < this.totalCapacity) {
    assignedSlot = this.nextSequentialNumber;
    this.nextSequentialNumber++;
    this.activeNumbers.add(assignedSlot);
    return assignedSlot;
  } else {
    return -1;
  }
};

PhoneDirectory.prototype.check = function (slotId) {
  if (slotId < 0 || slotId >= this.totalCapacity) {
    return false;
  } else if (this.freedNumbers.has(slotId)) {
    return true;
  } else if (slotId >= this.nextSequentialNumber) {
    return true;
  } else {
    return false;
  }
};

PhoneDirectory.prototype.release = function (slotId) {
  if (slotId < 0 || slotId >= this.totalCapacity) {
    return;
  } else if (this.activeNumbers.has(slotId)) {
    this.activeNumbers.delete(slotId);
    this.freedNumbers.add(slotId);
  }
};

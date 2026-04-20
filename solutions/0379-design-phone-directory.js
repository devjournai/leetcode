/**
 * Design Phone Directory
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

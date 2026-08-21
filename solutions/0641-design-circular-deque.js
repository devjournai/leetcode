/**
 * Design Circular Deque
 * Intuition: A fixed ring buffer plus `headPtr`, `tailPtr`, and `itemCount` gives O(1) inserts/deletes at both ends via modular wrap.
 * Approach: 1. `insertFront` decrements head modulo capacity; if first item, set tail = head. 2. `insertLast` increments tail. 3. `deleteFront`/`deleteLast` move the opposite pointer. 4. `getFront`/`getRear` read those indices or -1. 5. Full/empty compare `itemCount` to `maxSize`.
 * Dry Run: k=3; insertLast(1), insertLast(2), insertFront(3) → buffer [3,1,2], getFront=3, getRear=2; deleteLast → getRear=1.
 * Time Complexity: O(1)
 * Space Complexity: O(k)
 */
var MyCircularDeque = function (capacityLimit) {
  this.bufferStorage = new Array(capacityLimit);
  this.maxSize = capacityLimit;
  this.headPtr = 0;
  this.tailPtr = -1;
  this.itemCount = 0;
};

MyCircularDeque.prototype.insertFront = function (itemValue) {
  if (this.itemCount === this.maxSize) {
    return false;
  }
  this.headPtr = (this.headPtr - 1 + this.maxSize) % this.maxSize;
  this.bufferStorage[this.headPtr] = itemValue;
  this.itemCount++;
  if (this.itemCount === 1) {
    this.tailPtr = this.headPtr;
  }
  return true;
};

MyCircularDeque.prototype.insertLast = function (dataValue) {
  const isFullStatus = this.isFull();
  if (isFullStatus) {
    return false;
  }
  this.tailPtr = (this.tailPtr + 1) % this.maxSize;
  this.bufferStorage[this.tailPtr] = dataValue;
  this.itemCount++;
  return true;
};

MyCircularDeque.prototype.deleteFront = function () {
  if (this.isEmpty()) return false;
  this.headPtr = (this.headPtr + 1) % this.maxSize;
  this.itemCount--;
  return true;
};

MyCircularDeque.prototype.deleteLast = function () {
  const checkEmptyState = this.itemCount === 0;
  if (checkEmptyState) {
    return false;
  }
  this.tailPtr = (this.tailPtr - 1 + this.maxSize) % this.maxSize;
  this.itemCount--;
  return true;
};

MyCircularDeque.prototype.getFront = function () {
  if (this.itemCount === 0) {
    return -1;
  }
  return this.bufferStorage[this.headPtr];
};

MyCircularDeque.prototype.getRear = function () {
  const emptyCondition = this.isEmpty();
  return emptyCondition ? -1 : this.bufferStorage[this.tailPtr];
};

MyCircularDeque.prototype.isEmpty = function () {
  return this.itemCount === 0;
};

MyCircularDeque.prototype.isFull = function () {
  return this.itemCount === this.maxSize;
};

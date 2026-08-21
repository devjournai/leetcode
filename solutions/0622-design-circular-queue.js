/**
 * Design Circular Queue
 * Intuition: A fixed array with modular `frontPointer`/`rearPointer`. Empty is `frontPointer === -1`; full is the next rear index wrapping onto front.
 * Approach: 1. Constructor: array of `kValue`, pointers -1. 2. `enQueue`: reject if full; if empty set front 0; advance rear mod capacity and store. 3. `deQueue`: if one element reset both to -1, else advance front. 4. `Front`/`Rear` return -1 when empty. 5. `isFull`: `(rear+1)%capacity === front`.
 * Dry Run: k=3, enQueue 1,2,3 then 4.
 *   - After 1,2,3: front 0 rear 2, isFull true, enQueue 4 false. deQueue then enQueue 4 succeeds at index 0.
 * Time Complexity: O(1)
 * Space Complexity: O(k)
 */
var MyCircularQueue = function (kValue) {
  this.queueData = new Array(kValue);
  this.maximumCapacity = kValue;
  this.frontPointer = -1;
  this.rearPointer = -1;
};

MyCircularQueue.prototype.enQueue = function (insertValue) {
  if (this.isFull()) {
    return false;
  }
  if (this.isEmpty()) {
    this.frontPointer = 0;
  }
  this.rearPointer = (this.rearPointer + 1) % this.maximumCapacity;
  this.queueData[this.rearPointer] = insertValue;
  return true;
};

MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  } else if (this.frontPointer === this.rearPointer) {
    this.frontPointer = -1;
    this.rearPointer = -1;
  } else {
    this.frontPointer = (this.frontPointer + 1) % this.maximumCapacity;
  }
  return true;
};

MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) {
    return -1;
  } else {
    return this.queueData[this.frontPointer];
  }
};

MyCircularQueue.prototype.Rear = function () {
  return this.isEmpty() ? -1 : this.queueData[this.rearPointer];
};

MyCircularQueue.prototype.isEmpty = function () {
  return this.frontPointer === -1;
};

MyCircularQueue.prototype.isFull = function () {
  return (this.rearPointer + 1) % this.maximumCapacity === this.frontPointer;
};

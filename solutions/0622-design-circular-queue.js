/**
 * Design Circular Queue
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

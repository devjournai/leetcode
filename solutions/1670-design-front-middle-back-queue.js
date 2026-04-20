/**
 * Design Front Middle Back Queue
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var FrontMiddleBackQueue = function () {
  this.queueData = [];
};

FrontMiddleBackQueue.prototype.pushFront = function (val) {
  this.queueData.unshift(val);
};

FrontMiddleBackQueue.prototype.pushMiddle = function (val) {
  let currentLength = this.queueData.length;
  let insertPosition = Math.floor(currentLength / 2);
  this.queueData.splice(insertPosition, 0, val);
};

FrontMiddleBackQueue.prototype.pushBack = function (val) {
  this.queueData.push(val);
};

FrontMiddleBackQueue.prototype.popFront = function () {
  let currentQueueSize = this.queueData.length;
  if (currentQueueSize === 0) {
    return -1;
  } else {
    return this.queueData.shift();
  }
};

FrontMiddleBackQueue.prototype.popMiddle = function () {
  let totalElements = this.queueData.length;
  if (totalElements === 0) {
    return -1;
  }
  let removalIndex = Math.floor((totalElements - 1) / 2);
  let removedValue = this.queueData.splice(removalIndex, 1);
  return removedValue[0];
};

FrontMiddleBackQueue.prototype.popBack = function () {
  let currentQueueCount = this.queueData.length;
  if (currentQueueCount === 0) {
    return -1;
  } else {
    return this.queueData.pop();
  }
};

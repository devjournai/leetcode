/**
 * Design Front Middle Back Queue
 * Intuition: An array can implement the six operations with unshift/splice/push and shift/splice/pop. Middle insert uses floor(n/2); middle pop uses floor((n-1)/2). Empty pops return -1.
 * Approach: 1. pushFront: unshift. 2. pushMiddle: splice at floor(len/2). 3. pushBack: push. 4. popFront/popBack: shift/pop or -1. 5. popMiddle: splice at floor((len-1)/2).
 * Dry Run: pushFront(1), pushBack(2), pushMiddle(3) → [1,3,2]; popMiddle → 3.
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

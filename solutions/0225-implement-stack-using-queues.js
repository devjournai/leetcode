/**
 * Implement Stack Using Queues
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var MyStack = function () {
  this.primaryStorage = [];
  this.secondaryStorage = [];
};

MyStack.prototype.push = function (x) {
  this.secondaryStorage.push(x);

  let primaryQueueLength = this.primaryStorage.length;
  let loopIndex = 0;
  while (loopIndex < primaryQueueLength) {
    let transferredItem = this.primaryStorage.shift();
    this.secondaryStorage.push(transferredItem);
    loopIndex++;
  }

  let temporaryReference = this.primaryStorage;
  this.primaryStorage = this.secondaryStorage;
  this.secondaryStorage = temporaryReference;
};

MyStack.prototype.pop = function () {
  let removedValue = this.primaryStorage.shift();
  return removedValue;
};

MyStack.prototype.top = function () {
  let peekedValue = this.primaryStorage[0];
  return peekedValue;
};

MyStack.prototype.empty = function () {
  let isEmptyResult = this.primaryStorage.length === 0;
  return isEmptyResult;
};

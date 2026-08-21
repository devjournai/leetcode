/**
 * Implement Stack Using Queues
 * Intuition: Two queues keep the newest element at the front of primaryStorage. Push enqueues into the empty secondary, then drains primary behind it and swaps the arrays.
 * Approach: 1. push(x): enqueue x on secondary, shift every primary item onto secondary, then swap the two arrays. 2. pop: shift primary front. 3. top: read primary[0]. 4. empty: primary length === 0.
 * Dry Run: push(1), push(2), top(), pop().
 *   - After push(1): primary = [1]. After push(2): secondary [2,1], swap → primary [2,1].
 *   - top = 2; pop shifts 2. Stack top behaves as LIFO.
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

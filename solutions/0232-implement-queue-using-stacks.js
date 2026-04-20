/**
 * Implement Queue Using Stacks
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var MyQueue = function () {
  this.inputStack = [];
  this.outputStack = [];
};

MyQueue.prototype.push = function (x) {
  this.inputStack.push(x);
};

MyQueue.prototype.pop = function () {
  if (this.outputStack.length === 0) {
    while (this.inputStack.length > 0) {
      let elementFromInput = this.inputStack.pop();
      this.outputStack.push(elementFromInput);
    }
  }
  let retrievedElement = this.outputStack.pop();
  return retrievedElement;
};

MyQueue.prototype.peek = function () {
  if (this.outputStack.length === 0) {
    while (this.inputStack.length > 0) {
      let transferredItem = this.inputStack.pop();
      this.outputStack.push(transferredItem);
    }
  }
  let frontOfQueue = this.outputStack[this.outputStack.length - 1];
  return frontOfQueue;
};

MyQueue.prototype.empty = function () {
  let currentEmptyState =
    this.inputStack.length === 0 && this.outputStack.length === 0;
  return currentEmptyState;
};

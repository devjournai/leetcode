/**
 * Implement Queue Using Stacks
 * Intuition: inputStack receives pushes; outputStack holds the reversed front. Amortized O(1) pop/peek by transferring only when output is empty.
 * Approach: 1. push appends to inputStack. 2. pop/peek: if output is empty, move all input items onto output, then pop/peek output's top. 3. empty when both stacks are empty.
 * Dry Run: push(1), push(2), peek(), pop().
 *   - input = [1,2], output empty.
 *   - peek transfers → output [2,1]; peek last = 1. pop removes 1.
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

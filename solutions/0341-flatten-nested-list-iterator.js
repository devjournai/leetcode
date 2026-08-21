/**
 * Flatten Nested List Iterator
 * Intuition: A stack of NestedInteger, seeded in reverse so the next item is on top, lets hasNext peel nested lists until an integer is ready and next pops that integer.
 * Approach: 1. Constructor stores nestedList by pushing from the end. 2. seedStack pushes itemsCollection from last to first. 3. hasNext loops: empty stack → false; top isInteger → true; else pop the list and seedStack it. 4. next pops and returns getInteger().
 * Dry Run: nestedList = [[1, 1], 2, [1, 1]].
 *   - Stack top is the first [1, 1]. hasNext replaces it with 1, 1 (reversed push).
 *   - Repeated next/hasNext yields 1, 1, 2, 1, 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var NestedIterator = function (nestedList) {
  this.internalStack = [];
  this.seedStack(nestedList);
};

NestedIterator.prototype.seedStack = function (itemsCollection) {
  let itemWalker = itemsCollection.length - 1;
  while (itemWalker >= 0) {
    this.internalStack.push(itemsCollection[itemWalker]);
    itemWalker--;
  }
};

NestedIterator.prototype.hasNext = function () {
  for (;;) {
    if (this.internalStack.length === 0) {
      return false;
    }
    const currentItemPeek = this.internalStack[this.internalStack.length - 1];
    if (currentItemPeek.isInteger()) {
      return true;
    }
    const listToProcess = this.internalStack.pop().getList();
    this.seedStack(listToProcess);
  }
};

NestedIterator.prototype.next = function () {
  return this.internalStack.pop().getInteger();
};

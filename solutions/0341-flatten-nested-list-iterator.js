/**
 * Flatten Nested List Iterator
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/

var NestedIterator = function(nestedList) {
  this.internalStack = [];
  this.seedStack(nestedList);
};

NestedIterator.prototype.seedStack = function(itemsCollection) {
  let itemWalker = itemsCollection.length - 1;
  while (itemWalker >= 0) {
    this.internalStack.push(itemsCollection[itemWalker]);
    itemWalker--;
  }
};

NestedIterator.prototype.hasNext = function() {
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

NestedIterator.prototype.next = function() {
  return this.internalStack.pop().getInteger();
};

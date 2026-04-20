/**
 * Peeking Iterator
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var PeekingIterator = function (iteratorInput) {
  this.baseIterator = iteratorInput;
  this.nextElementBuffer = null;
  this.hasMore = false;

  if (this.baseIterator.hasNext()) {
    this.nextElementBuffer = this.baseIterator.next();
    this.hasMore = true;
  }
};

PeekingIterator.prototype.peek = function () {
  return this.nextElementBuffer;
};

PeekingIterator.prototype.next = function () {
  const currentNextItem = this.nextElementBuffer;

  if (this.baseIterator.hasNext()) {
    this.nextElementBuffer = this.baseIterator.next();
  } else {
    this.nextElementBuffer = null;
    this.hasMore = false;
  }

  return currentNextItem;
};

PeekingIterator.prototype.hasNext = function () {
  return this.hasMore;
};

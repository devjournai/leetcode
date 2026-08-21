/**
 * Peeking Iterator
 * Intuition: Cache the next element so peek can return it without consuming the underlying iterator.
 * Approach: 1. Constructor: if hasNext, buffer next() and set hasMore. 2. peek returns the buffer. 3. next returns the buffer then refills or clears hasMore. 4. hasNext returns hasMore.
 * Dry Run: iterator over [1,2,3].
 *   - Buffer=1. peek→1, next→1 (buffer=2), peek→2, next→2 (buffer=3), next→3 (hasMore=false).
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

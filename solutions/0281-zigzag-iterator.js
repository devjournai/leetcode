/**
 * Zigzag Iterator
 * Intuition: Alternate between two lists with a flag. When one list is exhausted, drain the other without flipping.
 * Approach: 1. Store both vectors, two pointers, and shouldTakeFromFirst=true. 2. hasNext if either pointer is in range. 3. next: if both have items, take from the flagged list and flip; else take from the remaining list.
 * Dry Run: v1=[1,2], v2=[3,4,5,6].
 *   - Both nonempty: 1 (flip), 3 (flip), 2 (flip). v1 done → 4,5,6.
 *   - Sequence 1,3,2,4,5,6.
 * Time Complexity: O(1)
 * Space Complexity: O(K)
 */
var ZigzagIterator = function ZigzagIterator(v1Source, v2Source) {
  this.firstVectorData = v1Source;
  this.secondVectorData = v2Source;
  this.firstVectorPointer = 0;
  this.secondVectorPointer = 0;
  this.shouldTakeFromFirst = true;
};

ZigzagIterator.prototype.hasNext = function hasNext() {
  const hasMoreFromFirst =
    this.firstVectorPointer < this.firstVectorData.length;
  const hasMoreFromSecond =
    this.secondVectorPointer < this.secondVectorData.length;
  return hasMoreFromFirst || hasMoreFromSecond;
};

ZigzagIterator.prototype.next = function next() {
  let elementToReturn;
  const firstListHasElements =
    this.firstVectorPointer < this.firstVectorData.length;
  const secondListHasElements =
    this.secondVectorPointer < this.secondVectorData.length;

  if (firstListHasElements && secondListHasElements) {
    if (this.shouldTakeFromFirst) {
      elementToReturn = this.firstVectorData[this.firstVectorPointer];
      this.firstVectorPointer++;
    } else {
      elementToReturn = this.secondVectorData[this.secondVectorPointer];
      this.secondVectorPointer++;
    }
    this.shouldTakeFromFirst = !this.shouldTakeFromFirst;
  } else if (firstListHasElements) {
    elementToReturn = this.firstVectorData[this.firstVectorPointer];
    this.firstVectorPointer++;
  } else if (secondListHasElements) {
    elementToReturn = this.secondVectorData[this.secondVectorPointer];
    this.secondVectorPointer++;
  } else {
    return undefined;
  }

  return elementToReturn;
};

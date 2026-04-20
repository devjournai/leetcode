/**
 * Zigzag Iterator
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

/**
 * Design Compressed String Iterator
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var StringIterator = function (compressedString) {
  this.characterSegments = [];
  this.currentSegmentPointer = 0;
  this.remainingCharsInSegment = 0;

  let parsingIndex = 0;
  while (parsingIndex < compressedString.length) {
    const charValue = compressedString[parsingIndex];
    parsingIndex++;
    let numericValue = "";
    while (
      parsingIndex < compressedString.length &&
      /\d/.test(compressedString[parsingIndex])
    ) {
      numericValue += compressedString[parsingIndex];
      parsingIndex++;
    }
    this.characterSegments.push([charValue, parseInt(numericValue, 10)]);
  }
};

StringIterator.prototype.next = function () {
  if (!this.hasNext()) {
    return " ";
  }

  if (this.remainingCharsInSegment === 0) {
    this.remainingCharsInSegment =
      this.characterSegments[this.currentSegmentPointer][1];
  }

  const outputChar = this.characterSegments[this.currentSegmentPointer][0];
  this.remainingCharsInSegment--;

  if (this.remainingCharsInSegment === 0) {
    this.currentSegmentPointer++;
  }

  return outputChar;
};

StringIterator.prototype.hasNext = function () {
  return this.currentSegmentPointer < this.characterSegments.length;
};

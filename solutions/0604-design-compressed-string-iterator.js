/**
 * Design Compressed String Iterator
 * Intuition: Pre-parse the compressed form into `[char, count]` segments. `next` consumes one remaining count in the current segment; `hasNext` is true while `currentSegmentPointer` is in range.
 * Approach: 1. Constructor: scan `charValue` then digits into `numericValue`, push `[char, parseInt]`. Init `currentSegmentPointer=0`, `remainingCharsInSegment=0`. 2. `next`: if `!hasNext` return `" "`; if remaining is 0, load segment count; emit char, decrement; if 0, increment pointer. 3. `hasNext`: pointer `< characterSegments.length`.
 * Dry Run: compressedString="L1e2t1".
 *   - Segments [L,1],[e,2],[t,1]. next→L,e,e,t then " ". hasNext false after t.
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

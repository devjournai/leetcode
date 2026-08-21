/**
 * Design An Ordered Stream
 * Intuition: Inserts may arrive out of order. Hold values in a 0-based array and only emit the contiguous chunk starting at the next expected id.
 * Approach: 1. Array of n nulls and pointer currentExpectedId=0. 2. insert(idKey,value) writes index idKey-1. 3. If that is not the pointer, return []. 4. Else collect consecutive non-null values and advance the pointer.
 * Dry Run: n=5, insert(3,c) → []; insert(1,a) → ["a"]; insert(2,b) → ["b","c"].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var OrderedStream = function (n) {
  this.dataContainer = new Array(n).fill(null);
  this.currentExpectedId = 0;
};

OrderedStream.prototype.insert = function (idKey, value) {
  const targetIndex = idKey - 1;
  this.dataContainer[targetIndex] = value;

  if (targetIndex !== this.currentExpectedId) {
    return [];
  }

  const resultingChunk = [];
  let collectorIndex = this.currentExpectedId;
  while (
    collectorIndex < this.dataContainer.length &&
    this.dataContainer[collectorIndex] !== null
  ) {
    resultingChunk.push(this.dataContainer[collectorIndex]);
    collectorIndex++;
  }
  this.currentExpectedId = collectorIndex;

  return resultingChunk;
};

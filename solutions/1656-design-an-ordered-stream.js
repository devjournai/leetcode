/**
 * Design An Ordered Stream
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

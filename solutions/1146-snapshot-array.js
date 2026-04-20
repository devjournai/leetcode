/**
 * Snapshot Array
 * Time Complexity: O(1)
 * Space Complexity: O(M)
 */
var SnapshotArray = function (initialLength) {
  this.updatesList = [];
  this.snapCount = 0;
  this.totalLength = initialLength;
};

SnapshotArray.prototype.set = function (targetIndex, setValue) {
  if (!this.updatesList[this.snapCount]) {
    this.updatesList[this.snapCount] = new Map();
  }
  const currentSnapChanges = this.updatesList[this.snapCount];
  currentSnapChanges.set(targetIndex, setValue);
};

SnapshotArray.prototype.snap = function () {
  return this.snapCount++;
};

SnapshotArray.prototype.get = function (queryIndex, desiredSnapId) {
  let currentIterationId = desiredSnapId;
  while (currentIterationId >= 0) {
    const currentSnapMap = this.updatesList[currentIterationId];
    if (currentSnapMap && currentSnapMap.has(queryIndex)) {
      return currentSnapMap.get(queryIndex);
    }
    currentIterationId--;
  }
  return 0;
};

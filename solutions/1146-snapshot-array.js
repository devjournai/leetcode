/**
 * Snapshot Array
 * Intuition: Store only sparse writes per snapshot id. get walks snapshot ids downward until it finds a write for that index, else 0.
 * Approach: 1. Constructor keeps updatesList[], snapCount, length. 2. set writes into a Map at updatesList[snapCount]. 3. snap returns snapCount then increments. 4. get scans desiredSnapId..0 for the index.
 * Dry Run: SnapshotArray(3); set(0,5); snap(); set(0,6); get(0,0).
 *   - snap 0 map {0:5}, then snapCount=1, then snap 1 {0:6}. get(0,0) finds 5.
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

/**
 * Design a 3D Binary Matrix with Efficient Layer Tracking
 * Intuition: Layer `x` is a 2D slice. `largestMatrix` wants the layer with the most 1s, breaking ties toward the largest `x`. Track occupancy in a set and a per-layer counter.
 * Approach: 1. Store set cells as `"x,y,z"` keys and `layerCount[x]`. 2. `setCell`/`unsetCell` no-op if already set/unset, otherwise update the set and the layer count. 3. `largestMatrix` scans layers and returns the best index.
 * Dry Run: n=2. set(0,0,0) counts [1,0] → largest 0. set(1,1,1) counts [1,1] → largest 1 (tie). unset(0,0,0) counts [0,1] → 1.
 * Time Complexity: Constructor O(N); setCell/unsetCell O(1); largestMatrix O(N)
 * Space Complexity: O(N^3) worst case for occupied cells
 */

var Matrix3D = function (n) {
  this.layerSize = n;
  this.occupiedCells = new Set();
  this.setCountByLayer = new Array(n).fill(0);
};

Matrix3D.prototype.setCell = function (x, y, z) {
  const cellKey = x + "," + y + "," + z;
  if (this.occupiedCells.has(cellKey)) {
    return;
  }
  this.occupiedCells.add(cellKey);
  this.setCountByLayer[x]++;
};

Matrix3D.prototype.unsetCell = function (x, y, z) {
  const cellKey = x + "," + y + "," + z;
  if (!this.occupiedCells.has(cellKey)) {
    return;
  }
  this.occupiedCells.delete(cellKey);
  this.setCountByLayer[x]--;
};

Matrix3D.prototype.largestMatrix = function () {
  let bestLayerIndex = 0;
  let bestSetCount = this.setCountByLayer[0];
  for (let layerIndex = 1; layerIndex < this.layerSize; layerIndex++) {
    if (this.setCountByLayer[layerIndex] >= bestSetCount) {
      bestSetCount = this.setCountByLayer[layerIndex];
      bestLayerIndex = layerIndex;
    }
  }
  return bestLayerIndex;
};

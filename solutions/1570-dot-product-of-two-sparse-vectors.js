/**
 * Dot Product Of Two Sparse Vectors
 * Time Complexity: O(N)
 * Space Complexity: O(M)
 */
var SparseVector = function (nums) {
  this.sparseData = new Map();
  nums.forEach((val, idx) => {
    if (val !== 0) {
      this.sparseData.set(idx, val);
    }
  });
};

SparseVector.prototype.dotProduct = function (vec) {
  let finalProduct = 0;
  this.sparseData.forEach((elementValue, elementIndex) => {
    let otherVectorMap = vec.sparseData;
    if (otherVectorMap.has(elementIndex)) {
      finalProduct += elementValue * otherVectorMap.get(elementIndex);
    }
  });
  return finalProduct;
};

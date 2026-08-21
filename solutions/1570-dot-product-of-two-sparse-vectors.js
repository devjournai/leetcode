/**
 * Dot Product Of Two Sparse Vectors
 * Intuition: Store only nonzero index→value maps; the dot is the sum of products on shared indices.
 * Approach: 1. Constructor fills a Map of nonzeros. 2. dotProduct iterates this map and multiplies when the other has the index.
 * Dry Run: nums1 = [1,0,0,2,3], nums2 = [0,3,0,4,0].
 *   - Shared index 3: 2*4 = 8.
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

/**
 * Range Sum Query Mutable
 * Intuition: An iterative segment tree in an array of size 2n stores leaves at index n+i. Updates walk parents; range sums walk the half-open [left,right) while consuming odd nodes.
 * Approach: 1. Constructor: copy nums into segmentValues[n..]; for i=n-1..1, node[i]=node[2i]+node[2i+1]. 2. update: write leaf n+index, then parent=(pos>>1), sibling=pos^1, parent=pos+sibling. 3. sumRange: L=n+left, R=n+right+1; while L<R, if L odd add and L++, if R odd R-- and add, then L>>=1, R>>=1.
 * Dry Run: nums=[1,3,5]; update(1,2); sumRange(0,2).
 *   - Leaf 3 becomes 2; parents refresh. Range sum = 1+2+5=8.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var NumArray = function (nums) {
  this.arraySize = nums.length;
  this.segmentValues = new Array(2 * this.arraySize);

  let buildIndex;
  for (buildIndex = 0; buildIndex < this.arraySize; buildIndex++) {
    this.segmentValues[this.arraySize + buildIndex] = nums[buildIndex];
  }

  let parentIndex;
  for (parentIndex = this.arraySize - 1; parentIndex > 0; parentIndex--) {
    this.segmentValues[parentIndex] =
      this.segmentValues[parentIndex * 2] +
      this.segmentValues[parentIndex * 2 + 1];
  }
};

NumArray.prototype.update = function (index, val) {
  let actualTreeIndex = this.arraySize + index;
  this.segmentValues[actualTreeIndex] = val;

  let currentUpdatePosition = actualTreeIndex;
  while (currentUpdatePosition > 0) {
    let currentParentIndex = currentUpdatePosition >> 1;
    let siblingNodeIndex = currentUpdatePosition ^ 1;
    this.segmentValues[currentParentIndex] =
      this.segmentValues[currentUpdatePosition] +
      this.segmentValues[siblingNodeIndex];
    currentUpdatePosition = currentParentIndex;
  }
};

NumArray.prototype.sumRange = function (left, right) {
  let totalRangeSum = 0;
  let segmentLeftPointer = this.arraySize + left;
  let segmentRightPointer = this.arraySize + right + 1;

  while (segmentLeftPointer < segmentRightPointer) {
    if (segmentLeftPointer & 1) {
      totalRangeSum += this.segmentValues[segmentLeftPointer];
      segmentLeftPointer++;
    }
    if (segmentRightPointer & 1) {
      segmentRightPointer--;
      totalRangeSum += this.segmentValues[segmentRightPointer];
    }
    segmentLeftPointer >>= 1;
    segmentRightPointer >>= 1;
  }

  return totalRangeSum;
};

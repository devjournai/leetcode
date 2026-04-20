/**
 * Range Sum Query Mutable
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
    this.segmentValues[parentIndex] = this.segmentValues[parentIndex * 2] + this.segmentValues[parentIndex * 2 + 1];
  }
};

NumArray.prototype.update = function (index, val) {
  let actualTreeIndex = this.arraySize + index;
  this.segmentValues[actualTreeIndex] = val;

  let currentUpdatePosition = actualTreeIndex;
  while (currentUpdatePosition > 0) {
    let currentParentIndex = currentUpdatePosition >> 1;
    let siblingNodeIndex = currentUpdatePosition ^ 1;
    this.segmentValues[currentParentIndex] = this.segmentValues[currentUpdatePosition] + this.segmentValues[siblingNodeIndex];
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
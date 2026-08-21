/**
 * Range Sum Query Immutable
 * Intuition: Prefix sums turn a range sum into two array lookups: sum[0..right] minus sum[0..left-1].
 * Approach: 1. Constructor: prefix[0]=0, then prefix[i+1]=prefix[i]+nums[i]. 2. sumRange(left,right) = prefix[right+1] - prefix[left].
 * Dry Run: nums=[-2,0,3] → prefix=[0,-2,-2,1].
 *   - sumRange(0,2)=1-0=1. sumRange(1,2)=1-(-2)=3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var NumArray = function (numsArr) {
  this.prefixSumsContainer = [];
  let currentRunningSum = 0;
  this.prefixSumsContainer.push(currentRunningSum);

  let dataIndex = 0;
  let arrayLength = numsArr.length;

  while (dataIndex < arrayLength) {
    currentRunningSum = currentRunningSum + numsArr[dataIndex];
    this.prefixSumsContainer.push(currentRunningSum);
    dataIndex = dataIndex + 1;
  }
};

NumArray.prototype.sumRange = function (leftIndex, rightIndex) {
  let sumBeforeRightPlusOne = this.prefixSumsContainer[rightIndex + 1];
  let sumBeforeLeft = this.prefixSumsContainer[leftIndex];
  let rangeTotal = sumBeforeRightPlusOne - sumBeforeLeft;
  return rangeTotal;
};

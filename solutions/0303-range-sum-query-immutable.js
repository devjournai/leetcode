/**
 * Range Sum Query Immutable
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

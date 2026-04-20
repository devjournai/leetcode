/**
 * Max Number Of K Sum Pairs
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var maxOperations = function (nums, k) {
  const sortedValues = nums.sort((valA, valB) => valA - valB);
  let leftPointer = 0;
  let rightPointer = sortedValues.length - 1;
  let operationCount = 0;

  while (leftPointer < rightPointer) {
    const currentSumCalculation =
      sortedValues[leftPointer] + sortedValues[rightPointer];

    if (currentSumCalculation === k) {
      operationCount++;
      leftPointer++;
      rightPointer--;
    } else if (currentSumCalculation < k) {
      leftPointer++;
    } else {
      rightPointer--;
    }
  }

  return operationCount;
};

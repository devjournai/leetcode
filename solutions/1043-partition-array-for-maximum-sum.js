/**
 * Partition Array For Maximum Sum
 * Time Complexity: O(n * k)
 * Space Complexity: O(n)
 */
var maxSumAfterPartitioning = function (arr, k) {
  const arrayLength = arr.length;
  const memoizationTable = new Array(arrayLength + 1).fill(0);

  for (
    let currentEndIndex = 1;
    currentEndIndex <= arrayLength;
    currentEndIndex++
  ) {
    let maximumValueInSpan = 0;
    for (
      let currentPartitionSpan = 1;
      currentPartitionSpan <= Math.min(k, currentEndIndex);
      currentPartitionSpan++
    ) {
      const startPointOfPartition = currentEndIndex - currentPartitionSpan;
      maximumValueInSpan = Math.max(
        maximumValueInSpan,
        arr[startPointOfPartition],
      );

      const previousPartitionSum =
        memoizationTable[currentEndIndex - currentPartitionSpan];
      const currentPartitionTotal = maximumValueInSpan * currentPartitionSpan;
      const candidateOverallSum = previousPartitionSum + currentPartitionTotal;

      memoizationTable[currentEndIndex] = Math.max(
        memoizationTable[currentEndIndex],
        candidateOverallSum,
      );
    }
  }

  return memoizationTable[arrayLength];
};

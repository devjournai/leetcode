/**
 * Partition Array For Maximum Sum
 * Intuition: DP[i] is the best sum for the prefix of length i. The last partition is a block of length 1..k whose contribution is (block max)*length.
 * Approach: 1. dp[0]=0. 2. For end=1..n, for span=1..min(k,end), track max in that last span. 3. dp[end]=max(dp[end-span] + max*span). 4. Return dp[n].
 * Dry Run: arr = [1,15,7,9,2,5,10], k = 3.
 *   - Best last blocks yield partitions [1,15,7], [9], [2,5,10] -> 45+9+30=84.
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
        arr[startPointOfPartition]
      );

      const previousPartitionSum =
        memoizationTable[currentEndIndex - currentPartitionSpan];
      const currentPartitionTotal = maximumValueInSpan * currentPartitionSpan;
      const candidateOverallSum = previousPartitionSum + currentPartitionTotal;

      memoizationTable[currentEndIndex] = Math.max(
        memoizationTable[currentEndIndex],
        candidateOverallSum
      );
    }
  }

  return memoizationTable[arrayLength];
};

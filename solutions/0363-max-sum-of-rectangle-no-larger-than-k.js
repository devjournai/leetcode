/**
 * Max Sum Of Rectangle No Larger Than K
 * Intuition: Every rectangle is a contiguous column range; compressing those columns into a 1-D row array turns the problem into “max subarray sum ≤ k”, found by trying all prefix-sum differences against previously seen prefixes.
 * Approach: 1. For each left column, zero a row-aggregate array and expand right, adding the right column into the aggregate. 2. Scan the aggregate with a running prefix; for each stored prefix, candidate = running - prefix, keep it if ≤ k. 3. Insert the running prefix into the set. 4. Track the global max candidate.
 * Dry Run: matrix [[1,0,1],[0,-2,3]], k = 2. Columns 1..2 aggregate to [1,1]; prefixes 0 then 1 then 2 yield candidate 2 ≤ 2 → 2.
 * Time Complexity: O(R^2 * C^2)
 * Space Complexity: O(R)
 */
var maxSumSubmatrix = function (matrix, k) {
  let overallMaximumSum = -Infinity;
  const totalRows = matrix.length;
  const totalColumns = matrix[0].length;

  for (
    let leftColumnIndex = 0;
    leftColumnIndex < totalColumns;
    leftColumnIndex++
  ) {
    const currentColumnAggregate = new Array(totalRows).fill(0);
    for (
      let rightColumnIndex = leftColumnIndex;
      rightColumnIndex < totalColumns;
      rightColumnIndex++
    ) {
      for (
        let rowIteratorIndex = 0;
        rowIteratorIndex < totalRows;
        rowIteratorIndex++
      ) {
        currentColumnAggregate[rowIteratorIndex] +=
          matrix[rowIteratorIndex][rightColumnIndex];
      }

      const seenPrefixSums = new Set();
      seenPrefixSums.add(0);
      let currentRunningSum = 0;
      let maximumRectangleSumForCurrentRange = -Infinity;

      for (const colSumElement of currentColumnAggregate) {
        currentRunningSum += colSumElement;

        for (const storedPrefixValue of seenPrefixSums) {
          const candidateRectangleSum = currentRunningSum - storedPrefixValue;
          if (candidateRectangleSum <= k) {
            maximumRectangleSumForCurrentRange = Math.max(
              maximumRectangleSumForCurrentRange,
              candidateRectangleSum
            );
          }
        }
        seenPrefixSums.add(currentRunningSum);
      }
      overallMaximumSum = Math.max(
        overallMaximumSum,
        maximumRectangleSumForCurrentRange
      );
    }
  }

  return overallMaximumSum;
};

/**
 * Maximum Number Of Removal Queries That Can Be Processed I
 * Intuition: The problem asks for the maximum number of queries that can be processed after optimally choosing an initial subsequence from the given `nums` array. Since elements can only be removed from the first or last positions of the current sequence, the active part of the sequence always remains a contiguous block of the *initially chosen subsequence*. The "replace nums with a subsequence of nums" operation, in the context of operations that only modify the ends, often implies choosing an initial *contiguous subarray* from the original `nums` array. For each such initial contiguous subarray `nums[left...right]`, we can determine the maximum queries processed using dynamic programming.
 * Approach:
 * 1. Define `dpStorage[l][r]` as the maximum number of queries that can be processed if the current available sequence is the contiguous subarray `nums[l...r]` (from the original `nums` array).
 * 2. Initialize `dpStorage` with zeros. The dimensions will be `(arrayLength + 1) x (arrayLength + 1)` to handle empty segments and boundary conditions easily.
 * 3. Iterate `currentSegmentLength` (length of the subarray) from 1 to `arrayElementsCount`. This ensures that when computing `dpStorage[l][r]` for a segment of `currentSegmentLength`, the results for shorter segments (`dpStorage[l+1][r]` and `dpStorage[l][r-1]`) are already available.
 * 4. For each `currentSegmentLength`, iterate `segmentStartIndex` from 0 up to `arrayElementsCount - currentSegmentLength` to define the left boundary of the segment. The `segmentEndIndex` will be `segmentStartIndex + currentSegmentLength - 1`.
 * 5. To compute `dpStorage[segmentStartIndex][segmentEndIndex]`:
 *    a. Consider the path where `nums[segmentStartIndex]` is potentially removed. The number of queries processed *before* considering `nums[segmentStartIndex]` would be `dpStorage[segmentStartIndex + 1][segmentEndIndex]` (representing the subproblem `nums[segmentStartIndex+1...segmentEndIndex]`). Let this be `queriesProcessedRemovingLeft`.
 *    b. If `queriesProcessedRemovingLeft` is less than `totalQueriesCount` and `nums[segmentStartIndex]` is greater than or equal to `queries[queriesProcessedRemovingLeft]` (meaning `nums[segmentStartIndex]` can satisfy the next query in sequence), then this path can process `queriesProcessedRemovingLeft + 1` queries. Otherwise, it processes `queriesProcessedRemovingLeft` queries. Update a temporary `currentMaxProcessed` with this value.
 *    c. Similarly, consider the path where `nums[segmentEndIndex]` is potentially removed. The number of queries processed *before* considering `nums[segmentEndIndex]` would be `dpStorage[segmentStartIndex][segmentEndIndex - 1]`. Let this be `queriesProcessedRemovingRight`.
 *    d. If `queriesProcessedRemovingRight` is less than `totalQueriesCount` and `nums[segmentEndIndex]` is greater than or equal to `queries[queriesProcessedRemovingRight]`, then this path can process `queriesProcessedRemovingRight + 1` queries. Otherwise, it processes `queriesProcessedRemovingRight` queries. Update `currentMaxProcessed` with the maximum.
 *    e. `dpStorage[segmentStartIndex][segmentEndIndex]` is set to the final `currentMaxProcessed` value.
 * 6. After filling the `dpStorage`, the overall maximum number of queries that can be processed is the maximum value found in `dpStorage`, as any `nums[l...r]` could be the optimally chosen initial subsequence. Iterate through `dpStorage` to find this global maximum.
 * 7. An optimization: if at any point `overallMaximumQueries` reaches `totalQueriesCount`, we can immediately return `totalQueriesCount`.
 * Dry Run: `nums = [10, 20, 30]`, `queries = [15, 25]`
 * `totalQueriesCount = 2`, `arrayElementsCount = 3`. `dpStorage` is `4x4` with zeros.
 * `currentSegmentLength = 1`:
 *   `segmentStartIndex = 0, segmentEndIndex = 0 (nums[0]=10)`: `10 < queries[0]=15`. `dpStorage[0][0] = 0`.
 *   `segmentStartIndex = 1, segmentEndIndex = 1 (nums[1]=20)`: `20 >= queries[0]=15`. `dpStorage[1][1] = 1`.
 *   `segmentStartIndex = 2, segmentEndIndex = 2 (nums[2]=30)`: `30 >= queries[0]=15`. `dpStorage[2][2] = 1`.
 * `currentSegmentLength = 2`:
 *   `segmentStartIndex = 0, segmentEndIndex = 1 (nums[0]=10, nums[1]=20)`:
 *     `queriesProcessedRemovingLeft = dpStorage[1][1] = 1`. `nums[0]=10 < queries[1]=25`. Path 1 yields 1.
 *     `queriesProcessedRemovingRight = dpStorage[0][0] = 0`. `nums[1]=20 >= queries[0]=15`. Path 2 yields 1.
 *     `dpStorage[0][1] = max(1, 1) = 1`.
 *   `segmentStartIndex = 1, segmentEndIndex = 2 (nums[1]=20, nums[2]=30)`:
 *     `queriesProcessedRemovingLeft = dpStorage[2][2] = 1`. `nums[1]=20 < queries[1]=25`. Path 1 yields 1.
 *     `queriesProcessedRemovingRight = dpStorage[1][1] = 1`. `nums[2]=30 >= queries[1]=25`. Path 2 yields 2.
 *     `dpStorage[1][2] = max(1, 2) = 2`.
 * `currentSegmentLength = 3`:
 *   `segmentStartIndex = 0, segmentEndIndex = 2 (nums[0]=10, nums[1]=20, nums[2]=30)`:
 *     `queriesProcessedRemovingLeft = dpStorage[1][2] = 2`. `queries[2]` is out of bounds. Path 1 yields 2.
 *     `queriesProcessedRemovingRight = dpStorage[0][1] = 1`. `nums[2]=30 >= queries[1]=25`. Path 2 yields 2.
 *     `dpStorage[0][2] = max(2, 2) = 2`.
 * Final scan of `dpStorage`: `overallMaximumQueries = max(0,1,1,1,2,2) = 2`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var maximumProcessableQueries = function (nums, queries) {
  const totalQueriesCount = queries.length;
  const arrayElementsCount = nums.length;

  const dpStorage = Array(arrayElementsCount + 1)
    .fill(0)
    .map(() => Array(arrayElementsCount + 1).fill(0));

  for (
    let currentSegmentLength = 1;
    currentSegmentLength <= arrayElementsCount;
    currentSegmentLength++
  ) {
    for (
      let segmentStartIndex = 0;
      segmentStartIndex <= arrayElementsCount - currentSegmentLength;
      segmentStartIndex++
    ) {
      const segmentEndIndex = segmentStartIndex + currentSegmentLength - 1;

      let currentMaxProcessed = 0;

      let queriesProcessedRemovingLeft;
      if (segmentStartIndex + 1 <= segmentEndIndex) {
        queriesProcessedRemovingLeft =
          dpStorage[segmentStartIndex + 1][segmentEndIndex];
      } else {
        queriesProcessedRemovingLeft = 0;
      }

      if (
        queriesProcessedRemovingLeft < totalQueriesCount &&
        nums[segmentStartIndex] >= queries[queriesProcessedRemovingLeft]
      ) {
        currentMaxProcessed = Math.max(
          currentMaxProcessed,
          queriesProcessedRemovingLeft + 1
        );
      } else {
        currentMaxProcessed = Math.max(
          currentMaxProcessed,
          queriesProcessedRemovingLeft
        );
      }

      let queriesProcessedRemovingRight;
      if (segmentStartIndex <= segmentEndIndex - 1) {
        queriesProcessedRemovingRight =
          dpStorage[segmentStartIndex][segmentEndIndex - 1];
      } else {
        queriesProcessedRemovingRight = 0;
      }

      if (
        queriesProcessedRemovingRight < totalQueriesCount &&
        nums[segmentEndIndex] >= queries[queriesProcessedRemovingRight]
      ) {
        currentMaxProcessed = Math.max(
          currentMaxProcessed,
          queriesProcessedRemovingRight + 1
        );
      } else {
        currentMaxProcessed = Math.max(
          currentMaxProcessed,
          queriesProcessedRemovingRight
        );
      }

      dpStorage[segmentStartIndex][segmentEndIndex] = currentMaxProcessed;
    }
  }

  let overallMaximumQueries = 0;
  for (let iterateLeft = 0; iterateLeft < arrayElementsCount; iterateLeft++) {
    for (
      let iterateRight = iterateLeft;
      iterateRight < arrayElementsCount;
      iterateRight++
    ) {
      overallMaximumQueries = Math.max(
        overallMaximumQueries,
        dpStorage[iterateLeft][iterateRight]
      );
      if (overallMaximumQueries === totalQueriesCount) {
        return totalQueriesCount;
      }
    }
  }

  return overallMaximumQueries;
};

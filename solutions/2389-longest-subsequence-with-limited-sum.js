/**
 * Longest Subsequence With Limited Sum
 * Intuition: To maximize the subsequence length for a given sum limit, we should always pick the smallest available numbers. This suggests sorting the input array and then efficiently calculating sums of prefixes. For each query, a binary search on these prefix sums can quickly find the maximum length.
 * Approach: 1. Sort the `nums` array in ascending order. This ensures that any prefix of the sorted array represents the smallest possible sum for that number of elements. 2. Compute a prefix sum array from the sorted `nums`. `prefixSumArray[k]` will store the sum of the first `k` elements from the sorted `nums` array. `prefixSumArray[0]` will be 0. 3. For each query, perform a binary search on the prefix sum array to find the largest index `k` such that `prefixSumArray[k]` is less than or equal to the current query limit. This `k` will be the maximum length of a subsequence whose sum does not exceed the query limit. 4. Store these lengths in a result array and return it.
 * Dry Run: nums = [4, 5, 2, 1], queries = [3, 10, 21]
 * 1. Sort nums: sortedNumbers = [1, 2, 4, 5]
 * 2. Calculate prefix sums:
 *    cumulativePrefixSums = [0] (for 0 elements)
 *    cumulativePrefixSums = [0, 1] (sum of 1 element: 1)
 *    cumulativePrefixSums = [0, 1, 3] (sum of 2 elements: 1+2)
 *    cumulativePrefixSums = [0, 1, 3, 7] (sum of 3 elements: 1+2+4)
 *    cumulativePrefixSums = [0, 1, 3, 7, 12] (sum of 4 elements: 1+2+4+5)
 * 3. Process queries:
 *    - Query 3: Binary search for largest k where cumulativePrefixSums[k] <= 3.
 *      [0, 1, 3, 7, 12]
 *      searchLeft=0, searchRight=4
 *      mid=2. cumulativePrefixSums[2]=3 <= 3. searchLeft=2.
 *      searchLeft=2, searchRight=4
 *      mid=3. cumulativePrefixSums[3]=7 > 3. searchRight=2.
 *      searchLeft=2, searchRight=2. Loop ends. Result is 2.
 *    - Query 10: Binary search for largest k where cumulativePrefixSums[k] <= 10.
 *      [0, 1, 3, 7, 12]
 *      searchLeft=0, searchRight=4
 *      mid=2. cumulativePrefixSums[2]=3 <= 10. searchLeft=2.
 *      searchLeft=2, searchRight=4
 *      mid=3. cumulativePrefixSums[3]=7 <= 10. searchLeft=3.
 *      searchLeft=3, searchRight=4
 *      mid=4. cumulativePrefixSums[4]=12 > 10. searchRight=3.
 *      searchLeft=3, searchRight=3. Loop ends. Result is 3.
 *    - Query 21: Binary search for largest k where cumulativePrefixSums[k] <= 21.
 *      [0, 1, 3, 7, 12]
 *      searchLeft=0, searchRight=4
 *      mid=2. cumulativePrefixSums[2]=3 <= 21. searchLeft=2.
 *      searchLeft=2, searchRight=4
 *      mid=3. cumulativePrefixSums[3]=7 <= 21. searchLeft=3.
 *      searchLeft=3, searchRight=4
 *      mid=4. cumulativePrefixSums[4]=12 <= 21. searchLeft=4.
 *      searchLeft=4, searchRight=4. Loop ends. Result is 4.
 * Final answers: [2, 3, 4]
 * Time Complexity: O(N log N + M log N)
 * Space Complexity: O(N + M).
 */
var answerQueries = function (nums, queries) {
  const sortedNumbers = [...nums].sort((valueA, valueB) => valueA - valueB);

  const cumulativePrefixSums = [0];
  let currentSumValue = 0;
  for (const numberToProcess of sortedNumbers) {
    currentSumValue += numberToProcess;
    cumulativePrefixSums.push(currentSumValue);
  }

  const finalResults = new Array(queries.length);
  for (
    let queryIterationIndex = 0;
    queryIterationIndex < queries.length;
    queryIterationIndex++
  ) {
    const currentQueryLimit = queries[queryIterationIndex];
    let searchLeft = 0;
    let searchRight = sortedNumbers.length;
    let queryMatchLength = 0;

    while (searchLeft <= searchRight) {
      const searchMid = Math.floor((searchLeft + searchRight) / 2);
      if (searchMid >= cumulativePrefixSums.length) {
        // Handle potential out-of-bounds for mid if calculation strategy leads here
        searchRight = searchMid - 1;
        continue;
      }

      if (cumulativePrefixSums[searchMid] <= currentQueryLimit) {
        queryMatchLength = searchMid;
        searchLeft = searchMid + 1;
      } else {
        searchRight = searchMid - 1;
      }
    }
    finalResults[queryIterationIndex] = queryMatchLength;
  }

  return finalResults;
};

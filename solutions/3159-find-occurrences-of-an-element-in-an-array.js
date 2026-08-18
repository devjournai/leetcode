/**
 * Find Occurrences Of An Element In An Array
 * Intuition: Collect every index where nums equals x, then answer each query by that 1-based occurrence list or -1.
 * Approach: 1. Scan nums and push indices of x. 2. For each query, if query exceeds the list length return -1, else return the (query-1)th index.
 * Dry Run:
 *   nums = [1,3,1,7], queries = [1,3,2,4], x = 1
 *   indices of 1: [0,2]. Answers: 0, -1, 2, -1
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N)
 */
var occurrencesOfElement = function (nums, queries, x) {
  const matchingIndices = [];
  for (let index = 0; index < nums.length; index++) {
    if (nums[index] === x) {
      matchingIndices.push(index);
    }
  }
  return queries.map((occurrenceNumber) =>
    occurrenceNumber <= matchingIndices.length
      ? matchingIndices[occurrenceNumber - 1]
      : -1,
  );
};

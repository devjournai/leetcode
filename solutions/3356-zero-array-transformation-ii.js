/**
 * Zero Array Transformation II
 * Intuition: Queries must be applied as a prefix. Walk the array left to right and take the next unused query whenever the current index still needs more decrement, applying it on a difference array from `max(l, i)` to `r`.
 * Approach: 1. `line` is a difference array of applied query values; `decrement` is the prefix sum at `i`; `k` is how many queries are used. 2. For each index, while `decrement + line[i] < nums[i]`, consume query `k` (skip if `r < i`). 3. If queries run out, return -1. 4. Add `line[i]` into `decrement`. 5. Return `k`.
 * Dry Run: nums = [2, 0, 2], queries = [[0, 2, 1], [0, 2, 1]]
 *   i=0 needs 2: take both queries (line[0]+=1 twice). k=2. Rest covered. Answer 2.
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N)
 */
var minZeroArray = function (nums, queries) {
  const line = new Array(nums.length + 1).fill(0);
  let decrement = 0;
  let usedQueryCount = 0;

  for (let index = 0; index < nums.length; index++) {
    while (decrement + line[index] < nums[index]) {
      if (usedQueryCount === queries.length) {
        return -1;
      }
      const leftIndex = queries[usedQueryCount][0];
      const rightIndex = queries[usedQueryCount][1];
      const queryValue = queries[usedQueryCount][2];
      usedQueryCount++;
      if (rightIndex < index) {
        continue;
      }
      line[Math.max(leftIndex, index)] += queryValue;
      line[rightIndex + 1] -= queryValue;
    }
    decrement += line[index];
  }

  return usedQueryCount;
};

/**
 * Zero Array Transformation I
 * Intuition: Each query can decrement every index in `[l, r]` by 1 (at most once per query). Index `i` can be zeroed iff at least `nums[i]` queries cover it. A difference array counts coverage in linear time.
 * Approach: 1. For each query `[l, r]`, add 1 at `coverage[l]` and subtract 1 at `coverage[r+1]`. 2. Sweep left to right, accumulating `currentCoverage`. 3. If any `currentCoverage < nums[i]`, return false. 4. Otherwise return true.
 * Dry Run: nums = [1, 0, 1], queries = [[0, 2]]
 *   coverage = [1, 0, 0, -1]
 *   i=0: cov=1 >= 1; i=1: cov=1 >= 0; i=2: cov=1 >= 1. True.
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N)
 */
var isZeroArray = function (nums, queries) {
  const coverageDelta = new Array(nums.length + 1).fill(0);

  for (const [leftIndex, rightIndex] of queries) {
    coverageDelta[leftIndex]++;
    coverageDelta[rightIndex + 1]--;
  }

  let currentCoverage = 0;
  for (let index = 0; index < nums.length; index++) {
    currentCoverage += coverageDelta[index];
    if (currentCoverage < nums[index]) {
      return false;
    }
  }

  return true;
};

/**
 * Find the Number of Copy Arrays
 * Intuition: A copy array `copy` must keep the same consecutive differences as `original`, and `copy[i]` must stay inside `bounds[i]`. That is a sliding feasible interval for `copy[0]` (or equivalently the current value).
 * Approach: 1. Start with `[low, high] = bounds[0]`. 2. For each next index, shift the interval by `original[i] - original[i-1]` and intersect with `bounds[i]`. 3. The number of integer values left is `max(0, high - low + 1)`.
 * Dry Run: original = [1,3], bounds = [[1,2],[2,4]]. Diff = 2. Interval [1,2] → [3,4] intersect [2,4] = [3,4] → 2 copies.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countArrays = function (original, bounds) {
  let low = bounds[0][0];
  let high = bounds[0][1];

  for (let index = 1; index < original.length; index++) {
    const difference = original[index] - original[index - 1];
    low = Math.max(low + difference, bounds[index][0]);
    high = Math.min(high + difference, bounds[index][1]);
  }

  return Math.max(0, high - low + 1);
};

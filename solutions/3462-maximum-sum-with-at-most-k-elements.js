/**
 * Maximum Sum With at Most K Elements
 * Intuition: From row `i` we may take at most `limits[i]` of its largest values, and at most `k` values globally. Take the best eligible cells.
 * Approach: 1. For each row, sort descending and keep the first `limits[i]` entries. 2. Collect those candidates, sort descending, and sum the first `k`.
 * Dry Run: grid = [[1,2],[3,4]], limits = [1,2], k = 2. Eligible: 2 from row0, 4 and 3 from row1. Best two: 4+3 = 7.
 * Time Complexity: O(N M log(N M))
 * Space Complexity: O(N M)
 */
var maxSum = function (grid, limits, k) {
  const candidates = [];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    const sortedRow = [...grid[rowIndex]].sort((left, right) => right - left);
    for (let taken = 0; taken < limits[rowIndex]; taken++) {
      candidates.push(sortedRow[taken]);
    }
  }

  candidates.sort((left, right) => right - left);

  let total = 0;
  for (let index = 0; index < Math.min(k, candidates.length); index++) {
    total += candidates[index];
  }
  return total;
};

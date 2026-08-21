/**
 * Select Cells in Grid With Maximum Score
 * Intuition: Values must be unique and come from distinct rows. Group row indices by value and decide, from largest or in any order, whether to skip a value or assign it to one unused row.
 * Approach: 1. Map each number to the set of rows where it appears. 2. DP(i, mask): max score using numbers from index i onward, with mask marking used rows. 3. Skip the number, or take it from any unused row that contains it.
 * Dry Run:
 *   grid = [[1,2,3],[4,3,2],[1,1,1]]
 *   Pick 4 from row 1 and 3 from row 0 (or 2 from row 0) for score 7.
 * Time Complexity: O(U * m * 2^m) where U is the number of unique values (U <= 100, m <= 10)
 * Space Complexity: O(U * 2^m)
 */
var maxScore = function (grid) {
  const numToIndices = new Map();

  for (let index = 0; index < grid.length; index++) {
    for (const num of grid[index]) {
      if (!numToIndices.has(num)) {
        numToIndices.set(num, new Set());
      }
      numToIndices.get(num).add(index);
    }
  }

  const entries = [...numToIndices.entries()];
  const mem = Array.from({ length: entries.length }, () =>
    Array(1 << grid.length).fill(0)
  );

  const dfs = (i, mask) => {
    if (i === entries.length) {
      return 0;
    }
    if (mem[i][mask] !== 0) {
      return mem[i][mask];
    }

    let res = dfs(i + 1, mask);
    const [num, indices] = entries[i];
    for (const index of indices) {
      if (((mask >> index) & 1) === 0) {
        res = Math.max(res, num + dfs(i + 1, mask | (1 << index)));
      }
    }

    mem[i][mask] = res;
    return res;
  };

  return dfs(0, 0);
};

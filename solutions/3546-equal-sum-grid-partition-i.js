/**
 * Can Partition Grid
 * Intuition: A horizontal or vertical cut works iff some prefix of rows or columns sums to exactly half the grid, so the two parts are equal.
 * Approach: 1. Sum the grid and build rowSums/colSums. 2. If total is odd, return false. 3. Scan prefix row sums and prefix column sums (leaving at least one row/col on the other side) for target = total/2.
 * Dry Run: grid = [[1, 4], [2, 3]]. Total 10, target 5. Row prefixes: 5 then stop — horizontal cut after row 0 works.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m + n)
 */
var canPartitionGrid = function (grid) {
  const m = grid.length;
  const n = grid[0].length;

  let totalSum = 0;
  const rowSums = new Array(m).fill(0);
  const colSums = new Array(n).fill(0);

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const val = grid[r][c];
      totalSum += val;
      rowSums[r] += val;
      colSums[c] += val;
    }
  }

  if (totalSum % 2 !== 0) {
    return false;
  }

  const targetSum = totalSum / 2;

  let currentTopSum = 0;
  for (let r = 0; r < m - 1; r++) {
    currentTopSum += rowSums[r];
    if (currentTopSum === targetSum) {
      return true;
    }
  }

  let currentLeftSum = 0;
  for (let c = 0; c < n - 1; c++) {
    currentLeftSum += colSums[c];
    if (currentLeftSum === targetSum) {
      return true;
    }
  }

  return false;
};

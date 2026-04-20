/**
 * Can Partition Grid
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

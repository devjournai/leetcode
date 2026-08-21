/**
 * Find Sorted Submatrices With Maximum Element at Most K
 * Intuition: A valid submatrix is nonincreasing down each column and right along each row, with every entry ≤ k. For each cell, the longest valid leftward run is `dp[i][j]`. A monotonic stack per column then counts how many rectangles of that width (or less) end at this cell.
 * Approach: 1. `dp[i][j]` = 1 + `dp[i][j-1]` if `grid[i][j-1] >= grid[i][j] <= k`. 2. `stacks[j]` stores `(width, rowIndex, accumulatedCount)` of increasing widths. 3. If `grid[i][j] > k`, reset the column stack. 4. Pop taller widths, then add `width * (i - prevRow)` new matrices and accumulate. 5. Sum those accumulations.
 * Dry Run: grid = [[1, 2], [2, 1]], k = 2. Cell (1,1) has width 1 (2 ≱ 1 fails left). Stacks tally each 1x1 plus some 2-row pieces. Count all valid submatrices with max ≤ 2.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var countSubmatrices = function (grid, k) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  let totalSubmatrices = 0;
  const leftWidth = Array.from({ length: rowCount }, () =>
    new Array(columnCount).fill(0)
  );
  const columnStacks = Array.from({ length: columnCount }, () => [
    { subarrayWidth: 0, rowIndex: -1, accumulatedSubmatrices: 0 },
  ]);

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      if (grid[rowIndex][columnIndex] > k) {
        columnStacks[columnIndex] = [
          { subarrayWidth: 0, rowIndex, accumulatedSubmatrices: 0 },
        ];
        continue;
      }

      leftWidth[rowIndex][columnIndex] = 1;
      if (
        columnIndex > 0 &&
        grid[rowIndex][columnIndex - 1] <= k &&
        grid[rowIndex][columnIndex - 1] >= grid[rowIndex][columnIndex]
      ) {
        leftWidth[rowIndex][columnIndex] +=
          leftWidth[rowIndex][columnIndex - 1];
      }

      const width = leftWidth[rowIndex][columnIndex];
      const stack = columnStacks[columnIndex];
      while (
        stack.length > 0 &&
        width < stack[stack.length - 1].subarrayWidth
      ) {
        stack.pop();
      }

      const height = rowIndex - stack[stack.length - 1].rowIndex;
      const newSubmatrices = width * height;
      const accumulatedSubmatrices =
        stack[stack.length - 1].accumulatedSubmatrices + newSubmatrices;
      totalSubmatrices += accumulatedSubmatrices;
      stack.push({
        subarrayWidth: width,
        rowIndex,
        accumulatedSubmatrices,
      });
    }
  }

  return totalSubmatrices;
};

/**
 * Minimum Number of Flips to Make Binary Grid Palindromic I
 * Intuition: You may make every row palindromic or every column palindromic. Count pairwise mismatches in both orientations and take the cheaper option.
 * Approach: 1. For each row, count positions where row[j] != row[n-1-j]. 2. For each column, count grid[i][j] != grid[m-1-i][j]. 3. Return the minimum of those two totals.
 * Dry Run: grid = [[1, 0, 0], [0, 0, 0], [0, 0, 1]]. Row flips: 2 + 0 + 2 = 4. Column flips: 1 + 0 + 1 = 2. Answer 2.
 * Time Complexity: O(m n)
 * Space Complexity: O(1)
 */
var minFlips = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  let rowFlips = 0;
  let columnFlips = 0;

  for (const row of grid) {
    for (let index = 0; index < Math.floor(columnCount / 2); index++) {
      if (row[index] !== row[columnCount - 1 - index]) {
        rowFlips++;
      }
    }
  }

  for (let column = 0; column < columnCount; column++) {
    for (let index = 0; index < Math.floor(rowCount / 2); index++) {
      if (grid[index][column] !== grid[rowCount - 1 - index][column]) {
        columnFlips++;
      }
    }
  }

  return Math.min(rowFlips, columnFlips);
};

/**
 * Count Negative Numbers in a Sorted Matrix
 * Intuition: Rows and columns are sorted descending. Start at bottom-left: a negative means the rest of the row is negative; otherwise move right.
 * Approach: 1. Start row=m-1, col=0. 2. If grid[r][c]<0 add (n-c) and move up; else move right. 3. Stop at bounds. 4. Return the total.
 * Dry Run: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]. Stair-walk counts 8.
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
var countNegatives = function (grid) {
  const rowsQuantity = grid.length;
  if (rowsQuantity === 0) {
    return 0;
  }

  const columnsQuantity = grid[0].length;
  if (columnsQuantity === 0) {
    return 0;
  }

  let totalNegativeNumbers = 0;
  let currentRowPointer = rowsQuantity - 1;
  let currentColumnPointer = 0;

  while (currentRowPointer >= 0 && currentColumnPointer < columnsQuantity) {
    if (grid[currentRowPointer][currentColumnPointer] < 0) {
      totalNegativeNumbers += columnsQuantity - currentColumnPointer;
      currentRowPointer--;
    } else {
      currentColumnPointer++;
    }
  }

  return totalNegativeNumbers;
};

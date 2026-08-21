/**
 * Zigzag Grid Traversal With Skip
 * Intuition: Walk row 0 left-to-right, row 1 right-to-left, and so on, then keep every other cell starting from the first.
 * Approach: 1. Flatten the zigzag order into one list. 2. Collect even indices of that list.
 * Dry Run: [[1,2],[3,4]]. Zigzag 1,2,4,3; skip → [1,4].
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

var zigzagTraversal = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  const zigzagOrder = [];

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    if (rowIndex % 2 === 0) {
      for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
        zigzagOrder.push(grid[rowIndex][columnIndex]);
      }
    } else {
      for (let columnIndex = columnCount - 1; columnIndex >= 0; columnIndex--) {
        zigzagOrder.push(grid[rowIndex][columnIndex]);
      }
    }
  }

  const skippedTraversal = [];
  for (let index = 0; index < zigzagOrder.length; index += 2) {
    skippedTraversal.push(zigzagOrder[index]);
  }
  return skippedTraversal;
};

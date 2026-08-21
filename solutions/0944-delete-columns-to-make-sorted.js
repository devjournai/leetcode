/**
 * Delete Columns to Make Sorted
 * Intuition: A column is unsorted if some row’s character is smaller than the one above it. Count such columns; they must be deleted.
 * Approach: 1. Empty → 0. 2. For each column, scan rows 1..R-1; if strs[r][c] < strs[r-1][c], increment and break. 3. Return `deletedColumnsCount`.
 * Dry Run: ["cba","daf","ghi"]. Col0 c<d<g ok; col1 b<a → delete; col2 a<f<i ok. Answer 1.
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var minDeletionSize = function (strs) {
  let deletedColumnsCount = 0;
  const totalRows = strs.length;

  if (totalRows === 0) {
    return 0;
  }

  const totalColumns = strs[0].length;
  let currentColumnIndex = 0;

  while (currentColumnIndex < totalColumns) {
    let currentRowIndex = 1;
    let columnRequiresDeletion = false;

    while (currentRowIndex < totalRows) {
      const charAtCurrentRow = strs[currentRowIndex][currentColumnIndex];
      const charAtPreviousRow = strs[currentRowIndex - 1][currentColumnIndex];

      if (charAtCurrentRow < charAtPreviousRow) {
        deletedColumnsCount++;
        columnRequiresDeletion = true;
        break;
      }
      currentRowIndex++;
    }
    currentColumnIndex++;
  }

  return deletedColumnsCount;
};

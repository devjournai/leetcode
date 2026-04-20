/**
 * Delete Columns to Make Sorted
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

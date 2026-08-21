/**
 * Delete Columns to Make Sorted II
 * Intuition: Keep a column only if appending it to already-kept prefixes still leaves rows lexicographically nondecreasing; otherwise delete it.
 * Approach: 1. Start `currentAccumulatedPrefixes` as empty strings. 2. For each column, copy prefixes and append that column's letters. 3. If any row's new prefix is smaller than the previous row's, mark not keepable and increment `columnsRemovedTotal`. 4. Else commit the new prefixes. 5. Return deletions.
 * Dry Run: strs = ["ca","bb","ac"]. Col 0 prefixes c,b,a — b<c so delete. Col 1 prefixes a,b,c — sorted, keep. Answer 1.
 * Time Complexity: O(n * m^2)
 * Space Complexity: O(n * m)
 */
var minDeletionSize = function (strs) {
  const rowCount = strs.length;
  const columnCount = strs[0].length;

  let currentAccumulatedPrefixes = new Array(rowCount).fill("");
  let columnsRemovedTotal = 0;

  for (
    let currentColumnIndex = 0;
    currentColumnIndex < columnCount;
    currentColumnIndex++
  ) {
    const potentialNextPrefixes = currentAccumulatedPrefixes.slice();
    let isColumnKeepable = true;

    let currentRowIndex = 0;
    while (currentRowIndex < rowCount) {
      potentialNextPrefixes[currentRowIndex] +=
        strs[currentRowIndex][currentColumnIndex];

      if (
        currentRowIndex > 0 &&
        potentialNextPrefixes[currentRowIndex] <
          potentialNextPrefixes[currentRowIndex - 1]
      ) {
        isColumnKeepable = false;
        break;
      }
      currentRowIndex++;
    }

    if (isColumnKeepable) {
      currentAccumulatedPrefixes = potentialNextPrefixes;
    } else {
      columnsRemovedTotal++;
    }
  }

  return columnsRemovedTotal;
};

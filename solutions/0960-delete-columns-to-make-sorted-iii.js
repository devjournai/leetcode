/**
 * Delete Columns to Make Sorted III
 * Time Complexity: O(R * C^2)
 * Space Complexity: O(C)
 */
var minDeletionSize = function (inputStrings) {
  const isColumnValid = (arr, indexA, indexB) => {
    for (let currentString of arr) {
      if (currentString[indexA] > currentString[indexB]) {
        return false;
      }
    }
    return true;
  };

  const totalColumns = inputStrings[0].length;
  const longestSortedSubsequence = new Array(totalColumns).fill(1);

  for (let currentColumn = 1; currentColumn < totalColumns; currentColumn++) {
    for (
      let previousColumn = 0;
      previousColumn < currentColumn;
      previousColumn++
    ) {
      if (isColumnValid(inputStrings, previousColumn, currentColumn)) {
        longestSortedSubsequence[currentColumn] = Math.max(
          longestSortedSubsequence[currentColumn],
          longestSortedSubsequence[previousColumn] + 1,
        );
      }
    }
  }

  const maximumKeptColumns = Math.max(...longestSortedSubsequence);

  return totalColumns - maximumKeptColumns;
};

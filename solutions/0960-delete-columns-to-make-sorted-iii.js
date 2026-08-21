/**
 * Delete Columns to Make Sorted III
 * Intuition: Keep the longest subsequence of columns that is nondecreasing in every row; deletions = total columns minus that LIS-style length.
 * Approach: 1. `isColumnValid(arr, indexA, indexB)` checks every string has `s[indexA] <= s[indexB]`. 2. `longestSortedSubsequence[j]` is 1 + max over valid earlier columns. 3. Return `totalColumns - max(longestSortedSubsequence)`.
 * Dry Run: inputStrings = ["babca","bbazb"]. Columns 0,1,4 can stay (a≤a, b≤b in rows after pairing). LIS length 3 of 5 → delete 2.
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
          longestSortedSubsequence[previousColumn] + 1
        );
      }
    }
  }

  const maximumKeptColumns = Math.max(...longestSortedSubsequence);

  return totalColumns - maximumKeptColumns;
};

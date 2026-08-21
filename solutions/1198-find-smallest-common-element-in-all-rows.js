/**
 * Find Smallest Common Element In All Rows
 * Intuition: Rows are sorted, so candidates from the first row can be binary-searched in every other row; the first success is the smallest common value.
 * Approach: 1. Walk mat[0] left to right. 2. Binary-search each later row for that value. 3. Return the first value found in all rows, else -1.
 * Dry Run: mat = [[1,2,3],[2,3,4],[2,3,5]]. 1 missing in row 1; 2 found in all → 2.
 * Time Complexity: O(m * n * log(n))
 * Space Complexity: O(1)
 */
var smallestCommonElement = function (mat) {
  const findNumberInRow = (searchArray, desiredNumber) => {
    let lowIndex = 0;
    let highIndex = searchArray.length - 1;

    while (lowIndex <= highIndex) {
      const middlePoint = Math.floor((lowIndex + highIndex) / 2);
      const currentValue = searchArray[middlePoint];

      if (currentValue === desiredNumber) {
        return true;
      } else if (currentValue < desiredNumber) {
        lowIndex = middlePoint + 1;
      } else {
        highIndex = middlePoint - 1;
      }
    }
    return false;
  };

  const totalMatrixRows = mat.length;
  const initialRow = mat[0];

  for (const elementFromFirstRow of initialRow) {
    let foundAcrossAllRows = true;
    for (let nextRowIndex = 1; nextRowIndex < totalMatrixRows; nextRowIndex++) {
      if (!findNumberInRow(mat[nextRowIndex], elementFromFirstRow)) {
        foundAcrossAllRows = false;
        break;
      }
    }
    if (foundAcrossAllRows) {
      return elementFromFirstRow;
    }
  }

  return -1;
};

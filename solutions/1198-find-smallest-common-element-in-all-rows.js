/**
 * Find Smallest Common Element In All Rows
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

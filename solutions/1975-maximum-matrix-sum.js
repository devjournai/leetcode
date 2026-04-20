/**
 * Maximum Matrix Sum
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var maxMatrixSum = function (matrix) {
  let overallAbsoluteSum = 0;
  let signFlipCounter = 0;
  let minimumValueMagnitude = Infinity;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (let colIndex = 0; colIndex < matrix[rowIndex].length; colIndex++) {
      let currentValue = matrix[rowIndex][colIndex];
      let currentAbsoluteValue = Math.abs(currentValue);
      overallAbsoluteSum += currentAbsoluteValue;
      if (currentValue < 0) {
        signFlipCounter++;
      }
      minimumValueMagnitude = Math.min(
        minimumValueMagnitude,
        currentAbsoluteValue,
      );
    }
  }

  if (signFlipCounter % 2 === 0) {
    return overallAbsoluteSum;
  } else {
    return overallAbsoluteSum - 2 * minimumValueMagnitude;
  }
};

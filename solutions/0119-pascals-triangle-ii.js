/**
 * Pascals Triangle II
 * Time Complexity: O(rowIndex)
 * Space Complexity: O(rowIndex)
 */
var getRow = function (rowIndex) {
  const pascalRowValues = new Array(rowIndex + 1);

  pascalRowValues[0] = 1;
  let currentCoefficientValue = 1;

  for (
    let elementPosition = 1;
    elementPosition <= rowIndex;
    elementPosition++
  ) {
    currentCoefficientValue =
      (currentCoefficientValue * (rowIndex - elementPosition + 1)) /
      elementPosition;
    pascalRowValues[elementPosition] = currentCoefficientValue;
  }

  return pascalRowValues;
};

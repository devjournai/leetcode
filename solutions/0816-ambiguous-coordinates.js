/**
 * Ambiguous Coordinates
 * Time Complexity: O(N^4)
 * Space Complexity: O(N^3)
 */
var ambiguousCoordinates = function (s) {
  const numericContent = s.slice(1, s.length - 1);
  const coordinatePossibilities = [];

  for (let splitIndex = 1; splitIndex < numericContent.length; splitIndex++) {
    const leftSegment = numericContent.substring(0, splitIndex);
    const rightSegment = numericContent.substring(splitIndex);

    const possibleLeftCoordinates = generateValidNumbers(leftSegment);
    const possibleRightCoordinates = generateValidNumbers(rightSegment);

    for (const singleLeftCoord of possibleLeftCoordinates) {
      for (const singleRightCoord of possibleRightCoordinates) {
        coordinatePossibilities.push(
          `(${singleLeftCoord}, ${singleRightCoord})`,
        );
      }
    }
  }

  return coordinatePossibilities;
};

function generateValidNumbers(currentSegment) {
  const generatedNumbers = [];

  if (checkIntegerValidity(currentSegment)) {
    generatedNumbers.push(currentSegment);
  }

  let decimalSpot = 1;
  while (decimalSpot < currentSegment.length) {
    const wholePart = currentSegment.substring(0, decimalSpot);
    const fractionalPart = currentSegment.substring(decimalSpot);

    if (
      checkIntegerValidity(wholePart) &&
      checkDecimalValidity(fractionalPart)
    ) {
      generatedNumbers.push(`${wholePart}.${fractionalPart}`);
    }
    decimalSpot++;
  }

  return generatedNumbers;
}

function checkIntegerValidity(stringToCheck) {
  return stringToCheck === "0" || stringToCheck[0] !== "0";
}

function checkDecimalValidity(stringToCheck) {
  return stringToCheck[stringToCheck.length - 1] !== "0";
}

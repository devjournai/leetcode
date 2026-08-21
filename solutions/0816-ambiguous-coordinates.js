/**
 * Ambiguous Coordinates
 * Intuition: Split the inner digits into two segments; each segment is either an integer or one valid decimal (no leading zeros except 0, no trailing zeros after a dot).
 * Approach: 1. Strip parentheses. 2. For each split, `generateValidNumbers` tries the raw integer plus every decimal index. 3. `checkIntegerValidity` / `checkDecimalValidity`. 4. Cartesian product as `(x, y)`.
 * Dry Run: "(123)". Splits 1|23, 12|3 → ("1, 23"), ("1, 2.3"), ("1.2, 3"), ("12, 3").
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
          `(${singleLeftCoord}, ${singleRightCoord})`
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

/**
 * Similar Rgb Color
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var similarRGB = function (color) {
  const shorthandHexValues = [
    "00",
    "11",
    "22",
    "33",
    "44",
    "55",
    "66",
    "77",
    "88",
    "99",
    "aa",
    "bb",
    "cc",
    "dd",
    "ee",
    "ff",
  ];

  function findClosestShorthand(targetHexSegment, validShorthandOptions) {
    const targetDecimalValue = parseInt(targetHexSegment, 16);
    let smallestDifference = Infinity;
    let resultShorthand = "";

    for (const currentOption of validShorthandOptions) {
      const currentOptionDecimal = parseInt(currentOption, 16);
      const segmentDifference = Math.abs(
        targetDecimalValue - currentOptionDecimal,
      );

      if (segmentDifference < smallestDifference) {
        smallestDifference = segmentDifference;
        resultShorthand = currentOption;
      }
    }
    return resultShorthand;
  }

  const redHexPart = color.substring(1, 3);
  const greenHexPart = color.substring(3, 5);
  const blueHexPart = color.substring(5, 7);

  const bestRedShorthand = findClosestShorthand(redHexPart, shorthandHexValues);
  const bestGreenShorthand = findClosestShorthand(
    greenHexPart,
    shorthandHexValues,
  );
  const bestBlueShorthand = findClosestShorthand(
    blueHexPart,
    shorthandHexValues,
  );

  return `#${bestRedShorthand}${bestGreenShorthand}${bestBlueShorthand}`;
};

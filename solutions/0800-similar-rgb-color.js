/**
 * Similar Rgb Color
 * Intuition: A shorthand color is `#xx` repeated (`00`,`11`,…,`ff`). Closest color independently maps each 2-hex channel to the nearest of those 16 values.
 * Approach: 1. List `shorthandHexValues`. 2. `findClosestShorthand` parses the channel and the option as hex and keeps min `|diff|`. 3. Slice color[1:3],[3:5],[5:7] and concatenate `#rrrgggbbb`.
 * Dry Run: "#09f166". Closest red 00/11 → 11, green ff, blue 66 → "#11ff66".
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
        targetDecimalValue - currentOptionDecimal
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
    shorthandHexValues
  );
  const bestBlueShorthand = findClosestShorthand(
    blueHexPart,
    shorthandHexValues
  );

  return `#${bestRedShorthand}${bestGreenShorthand}${bestBlueShorthand}`;
};

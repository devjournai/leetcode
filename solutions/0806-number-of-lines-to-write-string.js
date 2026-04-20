/**
 * Number Of Lines To Write String
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfLines = function (widths, s) {
  let totalLineQuantity = 1;
  let currentLineOccupancy = 0;

  for (const inputCharacter of s) {
    const characterAsciiValue = inputCharacter.charCodeAt(0) - 97;
    const characterPixelDimension = widths[characterAsciiValue];

    if (currentLineOccupancy + characterPixelDimension > 100) {
      totalLineQuantity++;
      currentLineOccupancy = characterPixelDimension;
    } else {
      currentLineOccupancy += characterPixelDimension;
    }
  }

  return [totalLineQuantity, currentLineOccupancy];
};

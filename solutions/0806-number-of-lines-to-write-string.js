/**
 * Number Of Lines To Write String
 * Intuition: Each letter has a width; wrap to a new line when occupancy + width would exceed 100.
 * Approach: 1. Start 1 line, occupancy 0. 2. Index `widths` by `charCode-97`. 3. If overflow, increment lines and set occupancy to this width; else add. 4. Return `[lines, occupancy]`.
 * Dry Run: widths all 10, s = "abcdefghijklmnopqrstuvwxyz". 10 letters/line → 3 lines, last occupancy 60.
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

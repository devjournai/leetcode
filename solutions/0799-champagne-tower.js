/**
 * Champagne Tower
 * Intuition: Each glass keeps 1 and splits leftover equally to the two glasses below; simulate row by row until `targetGlassRow`.
 * Approach: 1. `currentAmountInRow[0] = pouredCups`. 2. For each row < target, excess `(vol-1)/2` goes to next row at col and col+1 if positive. 3. Return `min(1, currentAmountInRow[targetGlassColumn])`.
 * Dry Run: poured = 1, row = 1, glass = 1. Row 0 has 1, no overflow → row 1 is 0. Return 0.
 * Time Complexity: O(queryRow^2)
 * Space Complexity: O(queryRow)
 */
var champagneTower = function (pouredCups, targetGlassRow, targetGlassColumn) {
  let currentAmountInRow = new Array(targetGlassRow + 1).fill(0);
  currentAmountInRow[0] = pouredCups;

  for (
    let currentRowIndex = 0;
    currentRowIndex < targetGlassRow;
    currentRowIndex++
  ) {
    let nextAmountInRow = new Array(targetGlassRow + 1).fill(0);

    for (
      let currentColumnIndex = 0;
      currentColumnIndex <= currentRowIndex;
      currentColumnIndex++
    ) {
      let cupVolume = currentAmountInRow[currentColumnIndex];
      let excessLiquid = (cupVolume - 1) / 2;

      if (excessLiquid > 0) {
        nextAmountInRow[currentColumnIndex] += excessLiquid;
        nextAmountInRow[currentColumnIndex + 1] += excessLiquid;
      }
    }
    currentAmountInRow = nextAmountInRow;
  }

  return Math.min(1, currentAmountInRow[targetGlassColumn]);
};

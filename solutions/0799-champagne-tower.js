/**
 * Champagne Tower
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

/**
 * Make A Square With The Same Color
 * Intuition: There are four 2x2 squares in a 3x3 grid. A square of one color exists if any 2x2 has at least 3 cells of the same color (so two flips at most).
 * Approach: 1. Check each 2x2. 2. Count black cells. 3. If count is 0,1,3, or 4 return true (already same or one/two flips). 4. Return false if all 2x2 have exactly two of each.
 * Dry Run:
 *   A 2x2 with 3 B and 1 W can become all B with one change, so true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var canMakeSquare = function (grid) {
  for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 2; columnIndex++) {
      let blackCount = 0;
      for (let deltaRow = 0; deltaRow < 2; deltaRow++) {
        for (let deltaCol = 0; deltaCol < 2; deltaCol++) {
          if (grid[rowIndex + deltaRow][columnIndex + deltaCol] === "B") {
            blackCount++;
          }
        }
      }
      if (blackCount !== 2) {
        return true;
      }
    }
  }
  return false;
};

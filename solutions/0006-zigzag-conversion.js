/**
 * Zigzag Conversion
 * Intuition: Characters are appended to `numRows` row strings while a `goingDown` flag bounces the write index between row 0 and the last row, then the rows are concatenated.
 * Approach: 1. If `numRows === 1` or the string is no longer than `numRows`, return `s`. 2. Allocate `stringLines` of empty strings. 3. For each character, append to `stringLines[currentRow]`. 4. Flip `goingDown` at the top or bottom row, then add ±1 to `currentRow`. 5. Return `stringLines.join("")`.
 * Dry Run: s = "PAYPAL", numRows = 3.
 *   - P row0, A row1, Y row2 (flip), P row1, A row0 (flip), L row1 → rows "PA", "APL", "Y". Join "PAAPLY".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var convert = function (s, numRows) {
  if (numRows === 1 || s.length <= numRows) {
    return s;
  }

  const stringLines = new Array(numRows).fill("");
  let currentRow = 0;
  let goingDown = false;

  for (let i = 0; i < s.length; i++) {
    stringLines[currentRow] += s[i];

    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  return stringLines.join("");
};

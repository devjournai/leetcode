/**
 * Zigzag Conversion
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

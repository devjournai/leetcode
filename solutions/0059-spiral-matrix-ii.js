/**
 * Spiral Matrix II
 * Intuition: Fill an n×n grid with 1..n² in the same clockwise layer order as reading a spiral: right, down, left, up, then shrink bounds.
 * Approach: 1. Allocate an n×n zero matrix and four bounds. 2. While the next value is ≤ n², write along the top row then increment top, down the right column then decrement right, and similarly for bottom and left, breaking if bounds cross.
 * Dry Run: n = 3.
 *   - Fill 1,2,3 on row 0; 4,5 down the right; 6,7 on the bottom; 8 up the left; 9 in the center. Result [[1,2,3],[8,9,4],[7,6,5]].
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var generateMatrix = function (n) {
  const inputSize = n;
  const nSquared = inputSize * inputSize;
  const outputMatrix = new Array(inputSize)
    .fill(0)
    .map(() => new Array(inputSize).fill(0));

  let topRowBoundary = 0;
  let bottomRowBoundary = inputSize - 1;
  let leftColumnBoundary = 0;
  let rightColumnBoundary = inputSize - 1;

  let currentFillValue = 1;

  while (currentFillValue <= nSquared) {
    for (
      let columnProgressForRight = leftColumnBoundary;
      columnProgressForRight <= rightColumnBoundary;
      columnProgressForRight++
    ) {
      outputMatrix[topRowBoundary][columnProgressForRight] = currentFillValue++;
    }
    topRowBoundary++;
    if (topRowBoundary > bottomRowBoundary || currentFillValue > nSquared)
      break;

    for (
      let rowProgressForDown = topRowBoundary;
      rowProgressForDown <= bottomRowBoundary;
      rowProgressForDown++
    ) {
      outputMatrix[rowProgressForDown][rightColumnBoundary] =
        currentFillValue++;
    }
    rightColumnBoundary--;
    if (leftColumnBoundary > rightColumnBoundary || currentFillValue > nSquared)
      break;

    for (
      let columnProgressForLeft = rightColumnBoundary;
      columnProgressForLeft >= leftColumnBoundary;
      columnProgressForLeft--
    ) {
      outputMatrix[bottomRowBoundary][columnProgressForLeft] =
        currentFillValue++;
    }
    bottomRowBoundary--;
    if (topRowBoundary > bottomRowBoundary || currentFillValue > nSquared)
      break;

    for (
      let rowProgressForUp = bottomRowBoundary;
      rowProgressForUp >= topRowBoundary;
      rowProgressForUp--
    ) {
      outputMatrix[rowProgressForUp][leftColumnBoundary] = currentFillValue++;
    }
    leftColumnBoundary++;
  }

  return outputMatrix;
};

/**
 * Spiral Matrix II
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

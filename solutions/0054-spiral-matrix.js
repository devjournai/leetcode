/**
 * Spiral Matrix
 * Intuition: Walk the remaining rectangle: right along the top row, down the right column, left along the bottom, up the left column, then shrink the four bounds. Stop once every cell is collected.
 * Approach: 1. Set row/col start and end. 2. While the result has fewer than m*n cells, traverse the four edges in order, shrinking the corresponding bound after each edge. 3. Break early if the count hits m*n between edges (odd remaining strip).
 * Dry Run: matrix = [[1,2,3],[4,5,6],[7,8,9]].
 *   - Right: 1,2,3; down: 6,9; left: 8,7; up: 4; then inner 5. Result [1,2,3,6,9,8,7,4,5].
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var spiralOrder = function (matrixInput) {
  const resultCollection = [];
  const numRows = matrixInput.length;
  if (numRows === 0) {
    return resultCollection;
  }
  const numCols = matrixInput[0].length;
  const totalElements = numRows * numCols;

  let currentRowStart = 0;
  let currentRowEnd = numRows - 1;
  let currentColStart = 0;
  let currentColEnd = numCols - 1;

  while (resultCollection.length < totalElements) {
    for (
      let pointerRight = currentColStart;
      pointerRight <= currentColEnd;
      pointerRight++
    ) {
      resultCollection.push(matrixInput[currentRowStart][pointerRight]);
    }
    currentRowStart++;

    if (resultCollection.length === totalElements) break;

    for (
      let pointerDown = currentRowStart;
      pointerDown <= currentRowEnd;
      pointerDown++
    ) {
      resultCollection.push(matrixInput[pointerDown][currentColEnd]);
    }
    currentColEnd--;

    if (resultCollection.length === totalElements) break;

    for (
      let pointerLeft = currentColEnd;
      pointerLeft >= currentColStart;
      pointerLeft--
    ) {
      resultCollection.push(matrixInput[currentRowEnd][pointerLeft]);
    }
    currentRowEnd--;

    if (resultCollection.length === totalElements) break;

    for (
      let pointerUp = currentRowEnd;
      pointerUp >= currentRowStart;
      pointerUp--
    ) {
      resultCollection.push(matrixInput[pointerUp][currentColStart]);
    }
    currentColStart++;
  }

  return resultCollection;
};

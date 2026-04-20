/**
 * Magic Squares In Grid
 * Time Complexity: O(R * C)
 * Space Complexity: O(1)
 */
var numMagicSquaresInside = function (mainGrid) {
  const gridHeight = mainGrid.length;
  const gridWidth = mainGrid[0].length;

  if (gridHeight < 3 || gridWidth < 3) return 0;

  let totalMagicSquaresFound = 0;

  for (
    let outerRowIterator = 0;
    outerRowIterator <= gridHeight - 3;
    outerRowIterator++
  ) {
    let innerColIterator = 0;
    while (innerColIterator <= gridWidth - 3) {
      if (verifyMagicSubgrid(mainGrid, outerRowIterator, innerColIterator)) {
        totalMagicSquaresFound++;
      }
      innerColIterator++;
    }
  }

  return totalMagicSquaresFound;
};

function verifyMagicSubgrid(currentSubgrid, topEdgeRow, leftEdgeCol) {
  if (currentSubgrid[topEdgeRow + 1][leftEdgeCol + 1] !== 5) {
    return false;
  }

  let subgridElements = [];
  let uniqueElementTracker = new Set();

  for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
    for (let colOffset = 0; colOffset < 3; colOffset++) {
      let currentCellValue =
        currentSubgrid[topEdgeRow + rowOffset][leftEdgeCol + colOffset];

      if (currentCellValue < 1 || currentCellValue > 9) {
        return false;
      }
      if (uniqueElementTracker.has(currentCellValue)) {
        return false;
      }
      uniqueElementTracker.add(currentCellValue);
      subgridElements.push(currentCellValue);
    }
  }

  const magicConstant = 15;

  let firstRowSum =
    subgridElements[0] + subgridElements[1] + subgridElements[2];
  let secondRowSum =
    subgridElements[3] + subgridElements[4] + subgridElements[5];
  let thirdRowSum =
    subgridElements[6] + subgridElements[7] + subgridElements[8];

  let firstColSum =
    subgridElements[0] + subgridElements[3] + subgridElements[6];
  let secondColSum =
    subgridElements[1] + subgridElements[4] + subgridElements[7];
  let thirdColSum =
    subgridElements[2] + subgridElements[5] + subgridElements[8];

  let mainDiagonalSum =
    subgridElements[0] + subgridElements[4] + subgridElements[8];
  let antiDiagonalSum =
    subgridElements[2] + subgridElements[4] + subgridElements[6];

  if (
    firstRowSum !== magicConstant ||
    secondRowSum !== magicConstant ||
    thirdRowSum !== magicConstant
  ) {
    return false;
  }
  if (
    firstColSum !== magicConstant ||
    secondColSum !== magicConstant ||
    thirdColSum !== magicConstant
  ) {
    return false;
  }
  if (mainDiagonalSum !== magicConstant || antiDiagonalSum !== magicConstant) {
    return false;
  }

  return true;
}

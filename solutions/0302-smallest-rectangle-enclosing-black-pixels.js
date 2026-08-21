/**
 * Smallest Rectangle Enclosing Black Pixels
 * Intuition: All black pixels form one connected region containing (x,y). Binary search finds the min/max row and col that still contain a '1', then the bounding box area is height*width.
 * Approach: 1. findMinRow in [0,x]: mid row has '1' → search up, else down. 2. findMaxRow in [x,R-1] similarly searching down on hit. 3. Analogous min/max column searches scanning a whole column. 4. Return (maxR-minR+1)*(maxC-minC+1).
 * Dry Run: single black pixel at (2,2), given (x,y)=(2,2).
 *   - min and max row/col are all 2.
 *   - Area 1*1=1.
 * Time Complexity: O(C log R + R log C)
 * Space Complexity: O(1)
 */
var minArea = function (image, x, y) {
  const gridRows = image.length;
  const gridCols = image[0].length;

  const findMinRowIndex = (img, startR, endR, totalC) => {
    let minRowIdxResult = endR;
    let searchLowerBound = startR;
    let searchUpperBound = endR;

    while (searchLowerBound <= searchUpperBound) {
      const midRowCheck = Math.floor((searchLowerBound + searchUpperBound) / 2);
      let rowHasBlack = false;
      for (let colIdxCheck = 0; colIdxCheck < totalC; colIdxCheck++) {
        const pixelValueRow = img[midRowCheck][colIdxCheck];
        if (pixelValueRow === "1") {
          rowHasBlack = true;
          break;
        }
      }

      if (rowHasBlack) {
        minRowIdxResult = midRowCheck;
        searchUpperBound = midRowCheck - 1;
      } else {
        searchLowerBound = midRowCheck + 1;
      }
    }
    return minRowIdxResult;
  };

  const findMaxRowIndex = (img, startR, endR, totalC) => {
    let maxRowIdxResult = startR;
    let rowSearchStart = startR;
    let rowSearchEnd = endR;

    while (rowSearchStart <= rowSearchEnd) {
      const currentMidRow = Math.floor((rowSearchStart + rowSearchEnd) / 2);
      let currentRowHasBlack = false;
      for (let columnIter = 0; columnIter < totalC; columnIter++) {
        const currentPixelValue = img[currentMidRow][columnIter];
        if (currentPixelValue === "1") {
          currentRowHasBlack = true;
          break;
        }
      }

      if (currentRowHasBlack) {
        maxRowIdxResult = currentMidRow;
        rowSearchStart = currentMidRow + 1;
      } else {
        rowSearchEnd = currentMidRow - 1;
      }
    }
    return maxRowIdxResult;
  };

  const findMinColIndex = (img, startC, endC, totalR) => {
    let minColIdxResult = endC;
    let colSearchBegin = startC;
    let colSearchEnd = endC;

    while (colSearchBegin <= colSearchEnd) {
      const midColPos = Math.floor((colSearchBegin + colSearchEnd) / 2);
      let colHasBlack = false;
      for (let rowIdxScan = 0; rowIdxScan < totalR; rowIdxScan++) {
        const columnScanPixel = img[rowIdxScan][midColPos];
        if (columnScanPixel === "1") {
          colHasBlack = true;
          break;
        }
      }

      if (colHasBlack) {
        minColIdxResult = midColPos;
        colSearchEnd = midColPos - 1;
      } else {
        colSearchBegin = midColPos + 1;
      }
    }
    return minColIdxResult;
  };

  const findMaxColIndex = (img, startC, endC, totalR) => {
    let maxColIdxResult = startC;
    let colRangeStart = startC;
    let colRangeEnd = endC;

    while (colRangeStart <= colRangeEnd) {
      const midColumnPosition = Math.floor((colRangeStart + colRangeEnd) / 2);
      let columnContainsBlack = false;
      for (let rowScanIdx = 0; rowScanIdx < totalR; rowScanIdx++) {
        const pixelAtScan = img[rowScanIdx][midColumnPosition];
        if (pixelAtScan === "1") {
          columnContainsBlack = true;
          break;
        }
      }

      if (columnContainsBlack) {
        maxColIdxResult = midColumnPosition;
        colRangeStart = midColumnPosition + 1;
      } else {
        colRangeEnd = midColumnPosition - 1;
      }
    }
    return maxColIdxResult;
  };

  const minBoundaryRow = findMinRowIndex(image, 0, x, gridCols);
  const maxBoundaryRow = findMaxRowIndex(image, x, gridRows - 1, gridCols);
  const minBoundaryCol = findMinColIndex(image, 0, y, gridRows);
  const maxBoundaryCol = findMaxColIndex(image, y, gridCols - 1, gridRows);

  const rectangleHeight = maxBoundaryRow - minBoundaryRow + 1;
  const rectangleWidth = maxBoundaryCol - minBoundaryCol + 1;
  const finalArea = rectangleHeight * rectangleWidth;

  return finalArea;
};

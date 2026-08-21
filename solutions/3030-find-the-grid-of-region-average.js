/**
 * Find The Grid Of Region Average
 * Intuition: The problem requires analyzing 3x3 subgrids for a specific condition (validity based on pixel intensity differences) and then calculating average intensities. A common pattern for problems involving subgrids is to iterate through all possible top-left corners of such subgrids. For each valid subgrid, its average intensity needs to be distributed to all pixels within that subgrid. Finally, for each pixel, if it belonged to multiple valid regions, its value is the average of those region averages; otherwise, it retains its original intensity.
 * Approach:
 * 1. Initialize three M x N grids: one for the `finalResultGrid`, one to accumulate `averageSumsAccumulator` from valid regions for each pixel, and one to count `regionParticipationCount` for each pixel.
 * 2. Iterate through all possible top-left corners `(mainGridRow, mainGridColumn)` for 3x3 subgrids within the `image`. These loops will run from `0` to `M-3` and `0` to `N-3` respectively.
 * 3. For each potential 3x3 subgrid, call a helper function `checkRegionValidity` to determine if it meets the `threshold` condition. This function iterates through all adjacent pixel pairs within the 3x3 subgrid (checking right and down neighbors from each pixel) and returns `true` if all differences are within the `threshold`, `false` otherwise.
 * 4. If the subgrid is valid, call another helper function `calculateRegionValue` to compute its average intensity, rounded down.
 * 5. Distribute this `currentWindowAverage` to all 9 pixels within the current 3x3 subgrid: add it to `averageSumsAccumulator` for each pixel and increment `regionParticipationCount` for each pixel.
 * 6. After processing all possible 3x3 subgrids, iterate through the entire M x N grid again using `finalProcessingRow` and `finalProcessingColumn`.
 * 7. For each pixel `(finalProcessingRow, finalProcessingColumn)`:
 *    a. If `regionParticipationCount` for that pixel is 0 (it did not belong to any valid region), set its value in `finalResultGrid` to its original value from `image`.
 *    b. Otherwise, calculate the final average by dividing `averageSumsAccumulator` by `regionParticipationCount` and rounding down, then store this in `finalResultGrid`.
 * 8. Return the `finalResultGrid`.
 * Dry Run:
 * Input: image = [[1,2,3],[4,5,6],[7,8,9]], threshold = 1
 * gridHeight = 3, gridWidth = 3
 * finalResultGrid, averageSumsAccumulator, regionParticipationCount are 3x3 grids of zeros.
 *
 * Loop 1 (Region processing):
 * mainGridRow = 0, mainGridColumn = 0 (for the only possible 3x3 region at (0,0))
 *   checkRegionValidity(0, 0, 1):
 *     - Pixel (0,0) = 1.
 *     - (0,0) vs (0,1): |1-2|=1 <= 1 (OK)
 *     - (0,0) vs (1,0): |1-4|=3 > 1 (FAIL) -> returns false immediately.
 *
 * isValidWindow is false. Skip average calculation and distribution for this region.
 *
 * Loop 2 (Final result calculation):
 * finalProcessingRow from 0 to 2, finalProcessingColumn from 0 to 2.
 * For every pixel (r, c):
 *   regionParticipationCount[r][c] is 0 (since no valid region was found).
 *   finalResultGrid[r][c] = image[r][c].
 *
 * Output: [[1,2,3],[4,5,6],[7,8,9]]
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var resultGrid = function (image, threshold) {
  const totalRows = image.length;
  const totalColumns = image[0].length;
  const finalResultGrid = Array.from({ length: totalRows }, () =>
    new Array(totalColumns).fill(0)
  );
  const averageSumsAccumulator = Array.from({ length: totalRows }, () =>
    new Array(totalColumns).fill(0)
  );
  const regionParticipationCount = Array.from({ length: totalRows }, () =>
    new Array(totalColumns).fill(0)
  );

  function checkRegionValidity(
    currentStartRow,
    currentStartCol,
    comparisonThreshold
  ) {
    for (
      let rowIndexIteration = currentStartRow;
      rowIndexIteration < currentStartRow + 3;
      rowIndexIteration++
    ) {
      for (
        let colIndexIteration = currentStartCol;
        colIndexIteration < currentStartCol + 3;
        colIndexIteration++
      ) {
        if (colIndexIteration < currentStartCol + 2) {
          const pixelValueA = image[rowIndexIteration][colIndexIteration];
          const pixelValueB = image[rowIndexIteration][colIndexIteration + 1];
          if (Math.abs(pixelValueA - pixelValueB) > comparisonThreshold) {
            return false;
          }
        }
        if (rowIndexIteration < currentStartRow + 2) {
          const pixelValueC = image[rowIndexIteration][colIndexIteration];
          const pixelValueD = image[rowIndexIteration + 1][colIndexIteration];
          if (Math.abs(pixelValueC - pixelValueD) > comparisonThreshold) {
            return false;
          }
        }
      }
    }
    return true;
  }

  function calculateRegionValue(averageStartRow, averageStartCol) {
    let totalPixelSum = 0;
    for (
      let rowCounterA = averageStartRow;
      rowCounterA < averageStartRow + 3;
      rowCounterA++
    ) {
      for (
        let colCounterA = averageStartCol;
        colCounterA < averageStartCol + 3;
        colCounterA++
      ) {
        totalPixelSum += image[rowCounterA][colCounterA];
      }
    }
    return Math.floor(totalPixelSum / 9);
  }

  for (let mainGridRow = 0; mainGridRow <= totalRows - 3; mainGridRow++) {
    for (
      let mainGridColumn = 0;
      mainGridColumn <= totalColumns - 3;
      mainGridColumn++
    ) {
      const isValidWindow = checkRegionValidity(
        mainGridRow,
        mainGridColumn,
        threshold
      );

      if (isValidWindow) {
        const currentWindowAverage = calculateRegionValue(
          mainGridRow,
          mainGridColumn
        );

        for (
          let distributeResultRow = mainGridRow;
          distributeResultRow < mainGridRow + 3;
          distributeResultRow++
        ) {
          for (
            let distributeResultColumn = mainGridColumn;
            distributeResultColumn < mainGridColumn + 3;
            distributeResultColumn++
          ) {
            averageSumsAccumulator[distributeResultRow][
              distributeResultColumn
            ] += currentWindowAverage;
            regionParticipationCount[distributeResultRow][
              distributeResultColumn
            ]++;
          }
        }
      }
    }
  }

  for (
    let finalProcessingRow = 0;
    finalProcessingRow < totalRows;
    finalProcessingRow++
  ) {
    for (
      let finalProcessingColumn = 0;
      finalProcessingColumn < totalColumns;
      finalProcessingColumn++
    ) {
      if (
        regionParticipationCount[finalProcessingRow][finalProcessingColumn] ===
        0
      ) {
        finalResultGrid[finalProcessingRow][finalProcessingColumn] =
          image[finalProcessingRow][finalProcessingColumn];
      } else {
        finalResultGrid[finalProcessingRow][finalProcessingColumn] = Math.floor(
          averageSumsAccumulator[finalProcessingRow][finalProcessingColumn] /
            regionParticipationCount[finalProcessingRow][finalProcessingColumn]
        );
      }
    }
  }

  return finalResultGrid;
};

/**
 * Stamping The Grid
 * Intuition: The problem requires covering all empty cells without covering occupied cells. Since stamps can overlap, for each empty cell, we only need to verify if it *can* be covered by at least one valid stamp. This can be efficiently determined using a 2D prefix sum technique to identify valid stamp placements (areas entirely composed of empty cells), and then a 2D difference array (or 2D Fenwick tree equivalent) to accumulate the "coverage effect" of all possible stamps on each grid cell. Finally, we verify if all original empty cells have been covered by at least one stamp.
 * Approach:
 * 1. Calculate a 2D prefix sum `prefixSumOfGrid` on the input `grid`. `prefixSumOfGrid[r][c]` stores the total count of '1's in the rectangle from `(0,0)` to `(r-1, c-1)`. This allows O(1) checking if any `stampHeight x stampWidth` area contains '1's.
 * 2. Initialize a 2D difference array `differenceMatrix` of the same extended size as `prefixSumOfGrid`. Iterate through all possible top-left corners `(stampAnchorRow, stampAnchorCol)` where a stamp of `stampHeight x stampWidth` could potentially be placed.
 *    - For each `(stampAnchorRow, stampAnchorCol)`, use `prefixSumOfGrid` to check if the area `[stampAnchorRow, stampAnchorRow + stampHeight - 1]` x `[stampAnchorCol, stampAnchorCol + stampWidth - 1]` contains only '0's (i.e., its sum of '1's is zero).
 *    - If it's all '0's, a stamp *can* be placed here. Mark this valid placement in the `differenceMatrix` using the 2D difference array technique: increment `differenceMatrix[stampAnchorRow][stampAnchorCol]`, decrement `differenceMatrix[stampAnchorRow][stampAnchorCol + stampWidth]`, decrement `differenceMatrix[stampAnchorRow + stampHeight][stampAnchorCol]`, and increment `differenceMatrix[stampAnchorRow + stampHeight][stampAnchorCol + stampWidth]`.
 * 3. Create a `stampedCells` matrix (same size as `grid`) to store the actual count of stamps covering each cell. Iterate through `stampedCells` using coordinates `(coveredMapRow, coveredMapCol)`. Calculate `stampedCells[coveredMapRow][coveredMapCol]` by performing a 2D prefix sum accumulation on the `differenceMatrix`. This effectively sums up all the increments and decrements from `differenceMatrix` to determine how many stamps cover each individual cell `(coveredMapRow, coveredMapCol)`.
 * 4. Perform a final check: Iterate through the original `grid` using coordinates `(finalCheckRow, finalCheckCol)`. If any cell `grid[finalCheckRow][finalCheckCol]` is '0' (empty) AND `stampedCells[finalCheckRow][finalCheckCol]` is '0' (not covered by any stamp), then it's impossible to cover all empty cells, so return `false`.
 * 5. If the loop completes without returning `false`, it means all '0' cells are covered, so return `true`.
 * Dry Run:
 * grid = [[0,0],[0,0]], stampHeight = 1, stampWidth = 1
 * rowsCount = 2, colsCount = 2
 *
 * 1. prefixSumOfGrid (size 3x3, initialized to 0s)
 *    grid[0][0]=0, prefixSumOfGrid[1][1] = 0
 *    grid[0][1]=0, prefixSumOfGrid[1][2] = 0
 *    grid[1][0]=0, prefixSumOfGrid[2][1] = 0
 *    grid[1][1]=0, prefixSumOfGrid[2][2] = 0
 *    All cells of prefixSumOfGrid remain 0.
 *
 * 2. differenceMatrix (size 3x3, initialized to 0s)
 *    Iterate stampAnchorRow from 0 to 2-1 = 1, stampAnchorCol from 0 to 2-1 = 1.
 *    (0,0): stampBottom = 1, stampRight = 1. prefixSumOfGrid[1][1]-prefixSumOfGrid[0][1]-prefixSumOfGrid[1][0]+prefixSumOfGrid[0][0] = 0.
 *           diffMatrix[0][0]++, diffMatrix[0][1]--, diffMatrix[1][0]--, diffMatrix[1][1]++.
 *    (0,1): stampBottom = 1, stampRight = 2. prefixSumOfGrid[1][2]-prefixSumOfGrid[0][2]-prefixSumOfGrid[1][1]+prefixSumOfGrid[0][1] = 0.
 *           diffMatrix[0][1]++, diffMatrix[0][2]--, diffMatrix[1][1]--, diffMatrix[1][2]++.
 *    (1,0): stampBottom = 2, stampRight = 1. prefixSumOfGrid[2][1]-prefixSumOfGrid[0][1]-prefixSumOfGrid[2][0]+prefixSumOfGrid[0][0] = 0.
 *           diffMatrix[1][0]++, diffMatrix[1][1]--, diffMatrix[2][0]--, diffMatrix[2][1]++.
 *    (1,1): stampBottom = 2, stampRight = 2. prefixSumOfGrid[2][2]-prefixSumOfGrid[0][2]-prefixSumOfGrid[2][1]+prefixSumOfGrid[0][1] = 0.
 *           diffMatrix[1][1]++, diffMatrix[1][2]--, diffMatrix[2][1]--, diffMatrix[2][2]++.
 *
 *    Resulting differenceMatrix:
 *    [1, 0, -1]
 *    [0, 0, 0]
 *    [-1, 0, 1]
 *    (Detailed calculation for diffMatrix[0][1]: initial 0. Decremented by (0,0) placement -> -1. Incremented by (0,1) placement -> 0)
 *
 * 3. stampedCells (size 2x2, initialized to 0s)
 *    coveredMapRow from 0 to 1, coveredMapCol from 0 to 1.
 *    stampedCells[0][0] = diffMatrix[0][0] = 1
 *    stampedCells[0][1] = stampedCells[0][0] + diffMatrix[0][1] = 1 + 0 = 1
 *    stampedCells[1][0] = stampedCells[0][0] + diffMatrix[1][0] = 1 + 0 = 1
 *    stampedCells[1][1] = stampedCells[1][0] + stampedCells[0][1] - stampedCells[0][0] + diffMatrix[1][1] = 1 + 1 - 1 + 0 = 1
 *    Resulting stampedCells:
 *    [1, 1]
 *    [1, 1]
 *
 * 4. Final Check
 *    finalCheckRow from 0 to 1, finalCheckCol from 0 to 1.
 *    grid[0][0]=0, stampedCells[0][0]=1 (covered)
 *    grid[0][1]=0, stampedCells[0][1]=1 (covered)
 *    grid[1][0]=0, stampedCells[1][0]=1 (covered)
 *    grid[1][1]=0, stampedCells[1][1]=1 (covered)
 *    All 0s are covered. Return true.
 *
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var possibleToStamp = function (gridInput, stampHeight, stampWidth) {
  const rowsCount = gridInput.length;
  const colsCount = gridInput[0].length;

  const prefixSumOfGrid = Array.from({ length: rowsCount + 1 }, () =>
    Array(colsCount + 1).fill(0),
  );
  const differenceMatrix = Array.from({ length: rowsCount + 1 }, () =>
    Array(colsCount + 1).fill(0),
  );

  for (let currentGridRow = 0; currentGridRow < rowsCount; currentGridRow++) {
    for (let currentGridCol = 0; currentGridCol < colsCount; currentGridCol++) {
      prefixSumOfGrid[currentGridRow + 1][currentGridCol + 1] =
        prefixSumOfGrid[currentGridRow + 1][currentGridCol] +
        prefixSumOfGrid[currentGridRow][currentGridCol + 1] -
        prefixSumOfGrid[currentGridRow][currentGridCol] +
        gridInput[currentGridRow][currentGridCol];
    }
  }

  for (
    let stampAnchorRow = 0;
    stampAnchorRow <= rowsCount - stampHeight;
    stampAnchorRow++
  ) {
    for (
      let stampAnchorCol = 0;
      stampAnchorCol <= colsCount - stampWidth;
      stampAnchorCol++
    ) {
      const stampBottomRow = stampAnchorRow + stampHeight;
      const stampRightCol = stampAnchorCol + stampWidth;

      const sumOfOccupied =
        prefixSumOfGrid[stampBottomRow][stampRightCol] -
        prefixSumOfGrid[stampBottomRow][stampAnchorCol] -
        prefixSumOfGrid[stampAnchorRow][stampRightCol] +
        prefixSumOfGrid[stampAnchorRow][stampAnchorCol];

      if (sumOfOccupied === 0) {
        differenceMatrix[stampAnchorRow][stampAnchorCol]++;
        differenceMatrix[stampAnchorRow][stampRightCol]--;
        differenceMatrix[stampBottomRow][stampAnchorCol]--;
        differenceMatrix[stampBottomRow][stampRightCol]++;
      }
    }
  }

  const stampedCells = Array.from({ length: rowsCount }, () =>
    Array(colsCount).fill(0),
  );

  for (let coveredMapRow = 0; coveredMapRow < rowsCount; coveredMapRow++) {
    for (let coveredMapCol = 0; coveredMapCol < colsCount; coveredMapCol++) {
      stampedCells[coveredMapRow][coveredMapCol] =
        (coveredMapRow > 0
          ? stampedCells[coveredMapRow - 1][coveredMapCol]
          : 0) +
        (coveredMapCol > 0
          ? stampedCells[coveredMapRow][coveredMapCol - 1]
          : 0) -
        (coveredMapRow > 0 && coveredMapCol > 0
          ? stampedCells[coveredMapRow - 1][coveredMapCol - 1]
          : 0) +
        differenceMatrix[coveredMapRow][coveredMapCol];

      if (
        gridInput[coveredMapRow][coveredMapCol] === 0 &&
        stampedCells[coveredMapRow][coveredMapCol] === 0
      ) {
        return false;
      }
    }
  }

  return true;
};

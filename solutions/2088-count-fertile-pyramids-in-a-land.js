/**
 * Count Fertile Pyramids In A Land
 * Intuition: The problem asks to count two types of pyramid shapes (normal and inverse) where all cells are fertile and the pyramid has more than one cell. This geometric counting problem can often be solved efficiently using dynamic programming by building up solutions for larger shapes from smaller, overlapping sub-shapes. A key observation is that a pyramid of height H rooted at (r, c) requires that the cell (r, c) is fertile, and the three cells immediately below it ((r+1, c-1), (r+1, c), (r+1, c+1)) must also be fertile and capable of supporting further pyramid layers. The minimum of the heights of pyramids rooted at these three lower cells determines the maximum height the current pyramid can achieve. An inverse pyramid follows a symmetric logic, looking upwards instead of downwards.
 * Approach:
 * 1. Initialize `gridRowsDimension` and `gridColsDimension` from the input `grid`. Also initialize `totalPyramidsCount` to 0.
 * 2. Create a 2D DP array `pyramidMaxHeight` of the same dimensions as `grid`, initialized to 0. This array will store the maximum height of a normal pyramid with `(currentRowIdx, currentColIdx)` as its apex.
 * 3. Iterate through `grid` from bottom-up (rows from `gridRowsDimension - 1` down to `0`, columns from `0` to `gridColsDimension - 1`) to populate `pyramidMaxHeight`.
 *    a. If `grid[currentRowIdx][currentColIdx]` is 0, then `pyramidMaxHeight[currentRowIdx][currentColIdx]` is 0.
 *    b. If `grid[currentRowIdx][currentColIdx]` is 1:
 *       i. If `currentRowIdx` is the last row (`gridRowsDimension - 1`), or `currentColIdx` is the first or last column (`0` or `gridColsDimension - 1`), then `pyramidMaxHeight[currentRowIdx][currentColIdx]` is 1. Such a pyramid can only be of height 1 as it cannot extend further downwards or sideways.
 *       ii. Otherwise (it's an interior cell capable of extension), `pyramidMaxHeight[currentRowIdx][currentColIdx]` is `1 + Math.min(pyramidMaxHeight[currentRowIdx + 1][currentColIdx - 1], pyramidMaxHeight[currentRowIdx + 1][currentColIdx], pyramidMaxHeight[currentRowIdx + 1][currentColIdx + 1])`. This is because for a pyramid to extend one layer deeper from `(currentRowIdx, currentColIdx)`, the three cells in the next row forming its base must all be fertile, and the pyramid layers below those three cells must also be able to form (the minimum of their heights determines how far down the current pyramid can extend).
 * 4. After populating `pyramidMaxHeight`, iterate through it to count valid normal pyramids. For each `currentNormalHeightVal = pyramidMaxHeight[scanRowIdx][scanColIdx]`, if `currentNormalHeightVal` is greater than 1, add `currentNormalHeightVal - 1` to `totalPyramidsCount` (since a height of 1 is just a single cell and not a valid pyramid according to the problem statement).
 * 5. Create another 2D DP array `inversePyramidMaxHeight` of the same dimensions as `grid`, initialized to 0. This array will store the maximum height of an inverse pyramid with `(inverseRowIdx, inverseColIdx)` as its apex (bottom-most cell).
 * 6. Iterate through `grid` from top-down (rows from `0` up to `gridRowsDimension - 1`, columns from `0` to `gridColsDimension - 1`) to populate `inversePyramidMaxHeight`.
 *    a. If `grid[inverseRowIdx][inverseColIdx]` is 0, then `inversePyramidMaxHeight[inverseRowIdx][inverseColIdx]` is 0.
 *    b. If `grid[inverseRowIdx][inverseColIdx]` is 1:
 *       i. If `inverseRowIdx` is the first row (`0`), or `inverseColIdx` is the first or last column (`0` or `gridColsDimension - 1`), then `inversePyramidMaxHeight[inverseRowIdx][inverseColIdx]` is 1.
 *       ii. Otherwise, `inversePyramidMaxHeight[inverseRowIdx][inverseColIdx]` is `1 + Math.min(inversePyramidMaxHeight[inverseRowIdx - 1][inverseColIdx - 1], inversePyramidMaxHeight[inverseRowIdx - 1][inverseColIdx], inversePyramidMaxHeight[inverseRowIdx - 1][inverseColIdx + 1])`. The logic is symmetric to normal pyramids, but looking upwards to the previous row for dependent layers.
 * 7. After populating `inversePyramidMaxHeight`, iterate through it to count valid inverse pyramids. For each `currentInverseHeightVal = inversePyramidMaxHeight[iterateRowIdx][iterateColIdx]`, if `currentInverseHeightVal` is greater than 1, add `currentInverseHeightVal - 1` to `totalPyramidsCount`.
 * 8. Return `totalPyramidsCount`.
 * Dry Run:
 * Input:
 * grid = [[1,1,1,1,1],
 *         [0,1,1,1,0],
 *         [0,0,1,0,0]]
 *
 * gridRowsDimension = 3, gridColsDimension = 5, totalPyramidsCount = 0
 *
 * pyramidMaxHeight initialization:
 * [[0,0,0,0,0],
 *  [0,0,0,0,0],
 *  [0,0,0,0,0]]
 *
 * --- Populating pyramidMaxHeight (bottom-up) ---
 * currentRowIdx = 2 (last row):
 *  currentColIdx = 0: grid[2][0]=0 -> pyramidMaxHeight[2][0]=0
 *  currentColIdx = 1: grid[2][1]=0 -> pyramidMaxHeight[2][1]=0
 *  currentColIdx = 2: grid[2][2]=1 (last row) -> pyramidMaxHeight[2][2]=1
 *  currentColIdx = 3: grid[2][3]=0 -> pyramidMaxHeight[2][3]=0
 *  currentColIdx = 4: grid[2][4]=0 -> pyramidMaxHeight[2][4]=0
 * pyramidMaxHeight:
 * [[0,0,0,0,0],
 *  [0,0,0,0,0],
 *  [0,0,1,0,0]]
 *
 * currentRowIdx = 1:
 *  currentColIdx = 0: grid[1][0]=0 -> pyramidMaxHeight[1][0]=0
 *  currentColIdx = 1: grid[1][1]=1 (interior cell)
 *    minAdjacentNormalHeight = Math.min(pyramidMaxHeight[2][0], pyramidMaxHeight[2][1], pyramidMaxHeight[2][2]) = Math.min(0,0,1) = 0
 *    pyramidMaxHeight[1][1] = 1 + 0 = 1
 *  currentColIdx = 2: grid[1][2]=1 (interior cell)
 *    minAdjacentNormalHeight = Math.min(pyramidMaxHeight[2][1], pyramidMaxHeight[2][2], pyramidMaxHeight[2][3]) = Math.min(0,1,0) = 0
 *    pyramidMaxHeight[1][2] = 1 + 0 = 1
 *  currentColIdx = 3: grid[1][3]=1 (interior cell)
 *    minAdjacentNormalHeight = Math.min(pyramidMaxHeight[2][2], pyramidMaxHeight[2][3], pyramidMaxHeight[2][4]) = Math.min(1,0,0) = 0
 *    pyramidMaxHeight[1][3] = 1 + 0 = 1
 *  currentColIdx = 4: grid[1][4]=0 -> pyramidMaxHeight[1][4]=0
 * pyramidMaxHeight:
 * [[0,0,0,0,0],
 *  [0,1,1,1,0],
 *  [0,0,1,0,0]]
 *
 * currentRowIdx = 0 (first row):
 *  currentColIdx = 0: grid[0][0]=1 (first col) -> pyramidMaxHeight[0][0]=1
 *  currentColIdx = 1: grid[0][1]=1 (interior cell)
 *    minAdjacentNormalHeight = Math.min(pyramidMaxHeight[1][0], pyramidMaxHeight[1][1], pyramidMaxHeight[1][2]) = Math.min(0,1,1) = 0
 *    pyramidMaxHeight[0][1] = 1 + 0 = 1
 *  currentColIdx = 2: grid[0][2]=1 (interior cell)
 *    minAdjacentNormalHeight = Math.min(pyramidMaxHeight[1][1], pyramidMaxHeight[1][2], pyramidMaxHeight[1][3]) = Math.min(1,1,1) = 1
 *    pyramidMaxHeight[0][2] = 1 + 1 = 2
 *  currentColIdx = 3: grid[0][3]=1 (interior cell)
 *    minAdjacentNormalHeight = Math.min(pyramidMaxHeight[1][2], pyramidMaxHeight[1][3], pyramidMaxHeight[1][4]) = Math.min(1,1,0) = 0
 *    pyramidMaxHeight[0][3] = 1 + 0 = 1
 *  currentColIdx = 4: grid[0][4]=1 (last col) -> pyramidMaxHeight[0][4]=1
 * Final pyramidMaxHeight:
 * [[1,1,2,1,1],
 *  [0,1,1,1,0],
 *  [0,0,1,0,0]]
 *
 * --- Count normal pyramids ---
 * scanRowIdx = 0, scanColIdx = 2: pyramidMaxHeight[0][2]=2. Add 2-1=1 to totalPyramidsCount. (totalPyramidsCount = 1)
 * All other pyramidMaxHeight[scanRowIdx][scanColIdx] are 0 or 1.
 *
 * inversePyramidMaxHeight initialization:
 * [[0,0,0,0,0],
 *  [0,0,0,0,0],
 *  [0,0,0,0,0]]
 *
 * --- Populating inversePyramidMaxHeight (top-down) ---
 * inverseRowIdx = 0 (first row):
 *  inverseColIdx = 0: grid[0][0]=1 (first row) -> inversePyramidMaxHeight[0][0]=1
 *  inverseColIdx = 1: grid[0][1]=1 (first row) -> inversePyramidMaxHeight[0][1]=1
 *  inverseColIdx = 2: grid[0][2]=1 (first row) -> inversePyramidMaxHeight[0][2]=1
 *  inverseColIdx = 3: grid[0][3]=1 (first row) -> inversePyramidMaxHeight[0][3]=1
 *  inverseColIdx = 4: grid[0][4]=1 (first row) -> inversePyramidMaxHeight[0][4]=1
 * inversePyramidMaxHeight:
 * [[1,1,1,1,1],
 *  [0,0,0,0,0],
 *  [0,0,0,0,0]]
 *
 * inverseRowIdx = 1:
 *  inverseColIdx = 0: grid[1][0]=0 -> inversePyramidMaxHeight[1][0]=0
 *  inverseColIdx = 1: grid[1][1]=1 (interior cell)
 *    minAdjacentInverseHeight = Math.min(inversePyramidMaxHeight[0][0], inversePyramidMaxHeight[0][1], inversePyramidMaxHeight[0][2]) = Math.min(1,1,1) = 1
 *    inversePyramidMaxHeight[1][1] = 1 + 1 = 2
 *  inverseColIdx = 2: grid[1][2]=1 (interior cell)
 *    minAdjacentInverseHeight = Math.min(inversePyramidMaxHeight[0][1], inversePyramidMaxHeight[0][2], inversePyramidMaxHeight[0][3]) = Math.min(1,1,1) = 1
 *    inversePyramidMaxHeight[1][2] = 1 + 1 = 2
 *  inverseColIdx = 3: grid[1][3]=1 (interior cell)
 *    minAdjacentInverseHeight = Math.min(inversePyramidMaxHeight[0][2], inversePyramidMaxHeight[0][3], inversePyramidMaxHeight[0][4]) = Math.min(1,1,1) = 1
 *    inversePyramidMaxHeight[1][3] = 1 + 1 = 2
 *  inverseColIdx = 4: grid[1][4]=0 -> inversePyramidMaxHeight[1][4]=0
 * inversePyramidMaxHeight:
 * [[1,1,1,1,1],
 *  [0,2,2,2,0],
 *  [0,0,0,0,0]]
 *
 * inverseRowIdx = 2 (last row):
 *  inverseColIdx = 0: grid[2][0]=0 -> inversePyramidMaxHeight[2][0]=0
 *  inverseColIdx = 1: grid[2][1]=0 -> inversePyramidMaxHeight[2][1]=0
 *  inverseColIdx = 2: grid[2][2]=1 (interior cell)
 *    minAdjacentInverseHeight = Math.min(inversePyramidMaxHeight[1][1], inversePyramidMaxHeight[1][2], inversePyramidMaxHeight[1][3]) = Math.min(2,2,2) = 2
 *    inversePyramidMaxHeight[2][2] = 1 + 2 = 3
 *  inverseColIdx = 3: grid[2][3]=0 -> inversePyramidMaxHeight[2][3]=0
 *  inverseColIdx = 4: grid[2][4]=0 -> inversePyramidMaxHeight[2][4]=0
 * Final inversePyramidMaxHeight:
 * [[1,1,1,1,1],
 *  [0,2,2,2,0],
 *  [0,0,3,0,0]]
 *
 * --- Count inverse pyramids ---
 * iterateRowIdx = 1, iterateColIdx = 1: inversePyramidMaxHeight[1][1]=2. Add 2-1=1 to totalPyramidsCount. (totalPyramidsCount = 2)
 * iterateRowIdx = 1, iterateColIdx = 2: inversePyramidMaxHeight[1][2]=2. Add 2-1=1 to totalPyramidsCount. (totalPyramidsCount = 3)
 * iterateRowIdx = 1, iterateColIdx = 3: inversePyramidMaxHeight[1][3]=2. Add 2-1=1 to totalPyramidsCount. (totalPyramidsCount = 4)
 * iterateRowIdx = 2, iterateColIdx = 2: inversePyramidMaxHeight[2][2]=3. Add 3-1=2 to totalPyramidsCount. (totalPyramidsCount = 6)
 * All other inversePyramidMaxHeight[iterateRowIdx][iterateColIdx] are 0 or 1.
 *
 * Return totalPyramidsCount = 6.
 *
 * Time Complexity: O(M*N)
 * Space Complexity: O(M*N)
 */
var countPyramids = function (grid) {
  const gridRowsDimension = grid.length;
  const gridColsDimension = grid[0].length;
  let totalPyramidsCount = 0;

  const pyramidMaxHeight = Array(gridRowsDimension)
    .fill(0)
    .map(() => Array(gridColsDimension).fill(0));

  for (
    let currentRowIdx = gridRowsDimension - 1;
    currentRowIdx >= 0;
    currentRowIdx--
  ) {
    for (
      let currentColIdx = 0;
      currentColIdx < gridColsDimension;
      currentColIdx++
    ) {
      const currentCellValue = grid[currentRowIdx][currentColIdx];
      if (currentCellValue === 0) {
        pyramidMaxHeight[currentRowIdx][currentColIdx] = 0;
      } else {
        if (
          currentRowIdx === gridRowsDimension - 1 ||
          currentColIdx === 0 ||
          currentColIdx === gridColsDimension - 1
        ) {
          pyramidMaxHeight[currentRowIdx][currentColIdx] = 1;
        } else {
          const nextRowBelow = currentRowIdx + 1;
          const leftAdjacentCol = currentColIdx - 1;
          const centerAdjacentCol = currentColIdx;
          const rightAdjacentCol = currentColIdx + 1;

          const heightFromLeft =
            pyramidMaxHeight[nextRowBelow][leftAdjacentCol];
          const heightFromCenter =
            pyramidMaxHeight[nextRowBelow][centerAdjacentCol];
          const heightFromRight =
            pyramidMaxHeight[nextRowBelow][rightAdjacentCol];
          const minAdjacentNormalHeight = Math.min(
            heightFromLeft,
            heightFromCenter,
            heightFromRight
          );

          pyramidMaxHeight[currentRowIdx][currentColIdx] =
            1 + minAdjacentNormalHeight;
        }
      }
    }
  }

  for (let scanRowIdx = 0; scanRowIdx < gridRowsDimension; scanRowIdx++) {
    for (let scanColIdx = 0; scanColIdx < gridColsDimension; scanColIdx++) {
      const currentNormalHeightVal = pyramidMaxHeight[scanRowIdx][scanColIdx];
      if (currentNormalHeightVal > 1) {
        totalPyramidsCount += currentNormalHeightVal - 1;
      }
    }
  }

  const inversePyramidMaxHeight = Array(gridRowsDimension)
    .fill(0)
    .map(() => Array(gridColsDimension).fill(0));

  for (
    let inverseRowIdx = 0;
    inverseRowIdx < gridRowsDimension;
    inverseRowIdx++
  ) {
    for (
      let inverseColIdx = 0;
      inverseColIdx < gridColsDimension;
      inverseColIdx++
    ) {
      const invertedCellValue = grid[inverseRowIdx][inverseColIdx];
      if (invertedCellValue === 0) {
        inversePyramidMaxHeight[inverseRowIdx][inverseColIdx] = 0;
      } else {
        if (
          inverseRowIdx === 0 ||
          inverseColIdx === 0 ||
          inverseColIdx === gridColsDimension - 1
        ) {
          inversePyramidMaxHeight[inverseRowIdx][inverseColIdx] = 1;
        } else {
          const previousRowAbove = inverseRowIdx - 1;
          const inverseLeftCol = inverseColIdx - 1;
          const inverseCenterCol = inverseColIdx;
          const inverseRightCol = inverseColIdx + 1;

          const inverseHeightFromLeft =
            inversePyramidMaxHeight[previousRowAbove][inverseLeftCol];
          const inverseHeightFromCenter =
            inversePyramidMaxHeight[previousRowAbove][inverseCenterCol];
          const inverseHeightFromRight =
            inversePyramidMaxHeight[previousRowAbove][inverseRightCol];
          const minAdjacentInverseHeight = Math.min(
            inverseHeightFromLeft,
            inverseHeightFromCenter,
            inverseHeightFromRight
          );

          inversePyramidMaxHeight[inverseRowIdx][inverseColIdx] =
            1 + minAdjacentInverseHeight;
        }
      }
    }
  }

  for (
    let iterateRowIdx = 0;
    iterateRowIdx < gridRowsDimension;
    iterateRowIdx++
  ) {
    for (
      let iterateColIdx = 0;
      iterateColIdx < gridColsDimension;
      iterateColIdx++
    ) {
      const currentInverseHeightVal =
        inversePyramidMaxHeight[iterateRowIdx][iterateColIdx];
      if (currentInverseHeightVal > 1) {
        totalPyramidsCount += currentInverseHeightVal - 1;
      }
    }
  }

  return totalPyramidsCount;
};

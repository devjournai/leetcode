/**
 * Median Of A Row Wise Sorted Matrix
 * Intuition: The median of N elements (N being odd) is the (N/2 + 1)-th smallest element. Since the matrix is row-wise sorted, we can use binary search on the potential range of the median value. For any given candidate value, we can efficiently count how many elements in the entire matrix are less than or equal to it by performing a binary search on each row. This count helps us narrow down the search range for the true median.
 * Approach: 1. Calculate the total number of elements in the matrix and determine the 1-indexed position of the median element (`medianTargetPosition`). 2. Perform a binary search for the median value over a possible range (e.g., from 0 to 10^6 + 1, as values are up to 10^6). Let `valueSearchLow` be 0 and `valueSearchHigh` be 1000001. 3. In each iteration of this outer binary search, compute `currentGuessMedian = valueSearchLow + Math.floor((valueSearchHigh - valueSearchLow) / 2)`. 4. For this `currentGuessMedian`, calculate `totalElementsCount` by iterating through each row of the matrix. For each `matrixRow`, use a *second* binary search (`rowLeftPointer`, `rowRightPointer`, `rowMidPointer`) to count how many elements are less than or equal to `currentGuessMedian`. This involves finding the first element in the row that is *greater* than `currentGuessMedian`; its index effectively gives the count of elements less than or equal to `currentGuessMedian`. 5. Sum these counts from all rows to get `totalElementsCount`. 6. If `totalElementsCount` is greater than or equal to `medianTargetPosition`, it means `currentGuessMedian` could be the median (or the median is smaller), so we try to find a smaller candidate by setting `valueSearchHigh = currentGuessMedian`. 7. Otherwise, `currentGuessMedian` is too small, so we need to look for a larger value by setting `valueSearchLow = currentGuessMedian + 1`. 8. The outer binary search loop terminates when `valueSearchLow` equals `valueSearchHigh`, and this `valueSearchHigh` (or `valueSearchLow`) is the median.
 * Dry Run:
 * grid = [[1, 3, 5], [2, 6, 9], [3, 6, 9]]
 * matrixRows = 3, matrixCols = 3
 * totalMatrixCells = 9
 * medianTargetPosition = Math.floor(9 / 2) + 1 = 5
 *
 * Initialize valueSearchLow = 0, valueSearchHigh = 1000001 (for demonstration, let's trace with effective range 0-10)
 *
 * Iteration 1 (with effective valueSearchHigh=10):
 *   currentGuessMedian = 0 + Math.floor((10 - 0) / 2) = 5
 *   totalElementsCount = 0
 *   For row [1, 3, 5]:
 *     Call `countElementsSmallerOrEqual(row, 5, 3)`:
 *       rowLeftPointer=0, rowRightPointer=3.
 *       rowMidPointer=1, grid[0][1]=3 <= 5. rowLeftPointer=2.
 *       rowMidPointer=2, grid[0][2]=5 <= 5. rowLeftPointer=3.
 *       Returns 3.
 *     totalElementsCount += 3 (now 3).
 *   For row [2, 6, 9]:
 *     Call `countElementsSmallerOrEqual(row, 5, 3)`:
 *       rowLeftPointer=0, rowRightPointer=3.
 *       rowMidPointer=1, grid[1][1]=6 > 5. rowRightPointer=1.
 *       rowMidPointer=0, grid[1][0]=2 <= 5. rowLeftPointer=1.
 *       Returns 1.
 *     totalElementsCount += 1 (now 4).
 *   For row [3, 6, 9]:
 *     Call `countElementsSmallerOrEqual(row, 5, 3)`:
 *       rowLeftPointer=0, rowRightPointer=3.
 *       rowMidPointer=1, grid[2][1]=6 > 5. rowRightPointer=1.
 *       rowMidPointer=0, grid[2][0]=3 <= 5. rowLeftPointer=1.
 *       Returns 1.
 *     totalElementsCount += 1 (now 5).
 *   totalElementsCount = 5.
 *   Is 5 >= medianTargetPosition (5)? Yes.
 *   valueSearchHigh = currentGuessMedian = 5.
 *   (valueSearchLow = 0, valueSearchHigh = 5)
 *
 * Iteration 2:
 *   currentGuessMedian = 0 + Math.floor((5 - 0) / 2) = 2
 *   totalElementsCount = 0
 *   For row [1, 3, 5]: `countElementsSmallerOrEqual(row, 2, 3)` returns 1. totalElementsCount += 1 (now 1).
 *   For row [2, 6, 9]: `countElementsSmallerOrEqual(row, 2, 3)` returns 1. totalElementsCount += 1 (now 2).
 *   For row [3, 6, 9]: `countElementsSmallerOrEqual(row, 2, 3)` returns 0. totalElementsCount += 0 (now 2).
 *   totalElementsCount = 2.
 *   Is 2 >= medianTargetPosition (5)? No.
 *   valueSearchLow = currentGuessMedian + 1 = 2 + 1 = 3.
 *   (valueSearchLow = 3, valueSearchHigh = 5)
 *
 * Iteration 3:
 *   currentGuessMedian = 3 + Math.floor((5 - 3) / 2) = 4
 *   totalElementsCount = 0
 *   For row [1, 3, 5]: `countElementsSmallerOrEqual(row, 4, 3)` returns 2. totalElementsCount += 2 (now 2).
 *   For row [2, 6, 9]: `countElementsSmallerOrEqual(row, 4, 3)` returns 1. totalElementsCount += 1 (now 3).
 *   For row [3, 6, 9]: `countElementsSmallerOrEqual(row, 4, 3)` returns 1. totalElementsCount += 1 (now 4).
 *   totalElementsCount = 4.
 *   Is 4 >= medianTargetPosition (5)? No.
 *   valueSearchLow = currentGuessMedian + 1 = 4 + 1 = 5.
 *   (valueSearchLow = 5, valueSearchHigh = 5)
 *
 * Loop terminates because valueSearchLow (5) is not less than valueSearchHigh (5).
 * Return valueSearchHigh (5).
 *
 * Time Complexity: O(R * log(C) * log(MaxVal))
 * Space Complexity: O(1)
 */
var matrixMedian = function (grid) {
  const matrixRows = grid.length;
  const matrixCols = grid[0].length;
  const totalMatrixCells = matrixRows * matrixCols;
  const medianTargetPosition = Math.floor(totalMatrixCells / 2) + 1;

  let valueSearchLow = 0;
  let valueSearchHigh = 1000001;

  while (valueSearchLow < valueSearchHigh) {
    const currentGuessMedian =
      valueSearchLow + Math.floor((valueSearchHigh - valueSearchLow) / 2);
    let totalElementsCount = 0;

    for (const currentRow of grid) {
      totalElementsCount += countElementsSmallerOrEqual(
        currentRow,
        currentGuessMedian,
        matrixCols,
      );
    }

    if (totalElementsCount >= medianTargetPosition) {
      valueSearchHigh = currentGuessMedian;
    } else {
      valueSearchLow = currentGuessMedian + 1;
    }
  }

  return valueSearchHigh;

  function countElementsSmallerOrEqual(rowArray, targetValue, rowLength) {
    let rowLeftPointer = 0;
    let rowRightPointer = rowLength;

    while (rowLeftPointer < rowRightPointer) {
      const rowMidPointer = Math.floor((rowLeftPointer + rowRightPointer) / 2);
      if (rowArray[rowMidPointer] <= targetValue) {
        rowLeftPointer = rowMidPointer + 1;
      } else {
        rowRightPointer = rowMidPointer;
      }
    }
    return rowLeftPointer;
  }
};

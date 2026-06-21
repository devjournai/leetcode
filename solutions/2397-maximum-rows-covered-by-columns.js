/**
 * Maximum Rows Covered By Columns
 * Intuition: The problem requires selecting a fixed number of columns to maximize row coverage. This is a classic combination problem that can be efficiently solved using backtracking or recursion with bitmasks to represent column selections, especially given the small constraint on the number of columns (n <= 12). Each row can be pre-processed into a bitmask representing the positions of its '1's, allowing for quick checks of coverage using bitwise operations.
 * Approach:
 * 1. Pre-process the input `matrix` into an array of bitmasks, where each bitmask `rowMasksArray[i]` represents the '1's in `matrix[i]`. This conversion allows for O(1) row coverage checks later.
 * 2. Define a recursive backtracking function, `exploreColumnCombinations`, to generate all possible combinations of `numSelect` columns. This function takes parameters: `currentColumnProcessingIndex` (the column index currently being considered), `currentSelectionBitmask` (a bitmask of columns selected so far), and `selectedColumnsCounter` (the count of columns selected so far).
 * 3. Inside `exploreColumnCombinations`:
 *    a. Base Case 1: If `selectedColumnsCounter` equals `numSelect`, it means a valid set of columns has been chosen. Call a helper function `calculateCoveredRows` with the `currentSelectionBitmask` and `rowMasksArray` to determine how many rows are covered by this specific column selection. Update the global `maxRowsCovered` if this count is higher.
 *    b. Base Case 2 / Pruning: If `currentColumnProcessingIndex` reaches the total number of columns (`columnCountVal`), or if it's impossible to select `numSelect` columns from the current `currentColumnProcessingIndex` onwards (i.e., `(columnCountVal - currentColumnProcessingIndex) + selectedColumnsCounter < numSelect`), then terminate this path as it cannot lead to a valid combination.
 *    c. Recursive Step: Make two recursive calls:
 *       i. Include the current column: `exploreColumnCombinations(currentColumnProcessingIndex + 1, currentSelectionBitmask | (1 << currentColumnProcessingIndex), selectedColumnsCounter + 1)`.
 *       ii. Exclude the current column: `exploreColumnCombinations(currentColumnProcessingIndex + 1, currentSelectionBitmask, selectedColumnsCounter)`.
 * 4. Define `calculateCoveredRows` helper function: It iterates through `rowMasksArray`. For each `singleRowMask`, it checks if `(singleRowMask & (~selectedMaskValue))` is zero. If it is, the row is covered. It returns the total count of covered rows.
 * 5. Initialize `maxRowsCovered` to 0, start the backtracking from `exploreColumnCombinations(0, 0, 0)`, and return `maxRowsCovered`.
 * Dry Run: matrix = [[0,0,0],[1,0,1],[0,1,1]], numSelect = 2
 * 1. `rowCountVal = 3`, `columnCountVal = 3`.
 * 2. `rowMasksArray` preprocessing:
 *    - `matrix[0]=[0,0,0]` -> `currentMaskValue = 0`. `rowMasksArray = [0]`
 *    - `matrix[1]=[1,0,1]` -> `currentMaskValue = (1<<0) | (1<<2) = 1 | 4 = 5`. `rowMasksArray = [0, 5]`
 *    - `matrix[2]=[0,1,1]` -> `currentMaskValue = (1<<1) | (1<<2) = 2 | 4 = 6`. `rowMasksArray = [0, 5, 6]`
 * 3. `maxRowsCovered = 0`.
 * 4. Call `exploreColumnCombinations(0, 0, 0)`:
 *    - `selectedColumnsCounter` (0) != `numSelect` (2).
 *    - Recurse (select col 0): `exploreColumnCombinations(1, 1, 1)`
 *      - Recurse (select col 1): `exploreColumnCombinations(2, 3, 2)` (cols 0,1 selected)
 *        - `selectedColumnsCounter` (2) == `numSelect` (2). Base Case.
 *        - Call `calculateCoveredRows(3, [0,5,6])`:
 *          - `singleRowMask=0`: `(0 & (~3))` is 0. Covered. `totalCoveredRowsCount=1`.
 *          - `singleRowMask=5` (101b): `(5 & (~3))` is `(101b & ...100b)` = `100b` (4) != 0. Not covered.
 *          - `singleRowMask=6` (110b): `(6 & (~3))` is `(110b & ...100b)` = `100b` (4) != 0. Not covered.
 *          - Returns 1.
 *        - `maxRowsCovered = Math.max(0, 1) = 1`.
 *      - Recurse (don't select col 1): `exploreColumnCombinations(2, 1, 1)` (col 0 selected)
 *        - Recurse (select col 2): `exploreColumnCombinations(3, 5, 2)` (cols 0,2 selected)
 *          - `selectedColumnsCounter` (2) == `numSelect` (2). Base Case.
 *          - Call `calculateCoveredRows(5, [0,5,6])`:
 *            - `singleRowMask=0`: `(0 & (~5))` is 0. Covered. `totalCoveredRowsCount=1`.
 *            - `singleRowMask=5`: `(5 & (~5))` is 0. Covered. `totalCoveredRowsCount=2`.
 *            - `singleRowMask=6`: `(6 & (~5))` is `(110b & ...010b)` = `010b` (2) != 0. Not covered.
 *            - Returns 2.
 *          - `maxRowsCovered = Math.max(1, 2) = 2`.
 *        - Recurse (don't select col 2): `exploreColumnCombinations(3, 1, 1)`. `currentColumnProcessingIndex` (3) == `columnCountVal` (3). Pruned.
 *    - Recurse (don't select col 0): `exploreColumnCombinations(1, 0, 0)`
 *      - Recurse (select col 1): `exploreColumnCombinations(2, 2, 1)` (col 1 selected)
 *        - Recurse (select col 2): `exploreColumnCombinations(3, 6, 2)` (cols 1,2 selected)
 *          - `selectedColumnsCounter` (2) == `numSelect` (2). Base Case.
 *          - Call `calculateCoveredRows(6, [0,5,6])`:
 *            - `singleRowMask=0`: `(0 & (~6))` is 0. Covered. `totalCoveredRowsCount=1`.
 *            - `singleRowMask=5`: `(5 & (~6))` is `(101b & ...001b)` = `001b` (1) != 0. Not covered.
 *            - `singleRowMask=6`: `(6 & (~6))` is 0. Covered. `totalCoveredRowsCount=2`.
 *            - Returns 2.
 *          - `maxRowsCovered = Math.max(2, 2) = 2`.
 *        - Recurse (don't select col 2): `exploreColumnCombinations(3, 2, 1)`. `currentColumnProcessingIndex` (3) == `columnCountVal` (3). Pruned.
 *      - Recurse (don't select col 1): `exploreColumnCombinations(2, 0, 0)`. Pruning: `(columnCountVal - currentColumnProcessingIndex) + selectedColumnsCounter < numSelect` is `(3-2)+0 < 2` (1 < 2), true. Pruned.
 * 5. Returns `maxRowsCovered = 2`.
 * Time Complexity: O(R * C + C(N, K) * R)
 * Space Complexity: O(R + C)
 */
var maximumRows = function (matrix, numSelect) {
  const rowCountVal = matrix.length;
  const columnCountVal = matrix[0].length;
  let maxRowsCovered = 0;

  const rowMasksArray = new Array(rowCountVal);
  for (let rIdx = 0; rIdx < rowCountVal; rIdx++) {
    let currentMaskValue = 0;
    for (let cIdx = 0; cIdx < columnCountVal; cIdx++) {
      if (matrix[rIdx][cIdx] === 1) {
        currentMaskValue |= 1 << cIdx;
      }
    }
    rowMasksArray[rIdx] = currentMaskValue;
  }

  function calculateCoveredRows(selectedMaskValue, allRowMasks) {
    let totalCoveredRowsCount = 0;
    let rowPointer = 0;
    while (rowPointer < allRowMasks.length) {
      const singleRowMask = allRowMasks[rowPointer];
      if ((singleRowMask & ~selectedMaskValue) === 0) {
        totalCoveredRowsCount++;
      }
      rowPointer++;
    }
    return totalCoveredRowsCount;
  }

  function exploreColumnCombinations(
    currentColumnProcessingIndex,
    currentSelectionBitmask,
    selectedColumnsCounter,
  ) {
    if (selectedColumnsCounter === numSelect) {
      maxRowsCovered = Math.max(
        maxRowsCovered,
        calculateCoveredRows(currentSelectionBitmask, rowMasksArray),
      );
      return;
    }

    if (
      currentColumnProcessingIndex === columnCountVal ||
      columnCountVal - currentColumnProcessingIndex + selectedColumnsCounter <
        numSelect
    ) {
      return;
    }

    exploreColumnCombinations(
      currentColumnProcessingIndex + 1,
      currentSelectionBitmask | (1 << currentColumnProcessingIndex),
      selectedColumnsCounter + 1,
    );
    exploreColumnCombinations(
      currentColumnProcessingIndex + 1,
      currentSelectionBitmask,
      selectedColumnsCounter,
    );
  }

  exploreColumnCombinations(0, 0, 0);

  return maxRowsCovered;
};

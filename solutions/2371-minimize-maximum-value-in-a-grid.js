/**
 * Minimize Maximum Value In A Grid
 * Intuition: To minimize the maximum value in the resulting grid while preserving relative order within rows and columns, we should assign new values greedily. Processing the original grid elements in ascending order allows us to determine the smallest possible replacement value for each element. This replacement value must be greater than any previously assigned value in its respective row or column, ensuring the relative order constraint is met with the minimum possible increment.
 * Approach: 1. Traverse the input grid to collect all elements along with their original values, row indices, and column indices into a list. 2. Sort this list of elements based on their original values in ascending order. 3. Initialize a result grid of the same dimensions with zeros, and two auxiliary arrays, one for tracking the maximum value placed so far in each row (`rowMaximumTracker`) and another for each column (`columnMaximumTracker`), also initialized to zeros. 4. Iterate through the sorted list of elements. For each element, calculate its new assigned value by taking the maximum of `rowMaximumTracker[elementRow]` and `columnMaximumTracker[elementCol]` and adding 1. 5. Place this `assignedNumber` into the `resultGrid` at `[elementRow][elementCol]`. 6. Update `rowMaximumTracker[elementRow]` and `columnMaximumTracker[elementCol]` with this new `assignedNumber`. 7. After processing all elements, return the `resultGrid`.
 * Dry Run:
 * grid = [[2, 4, 5], [7, 3, 9]]
 *
 * 1. Extract and Store:
 *    `originalElements` will be `[[2, 0, 0], [4, 0, 1], [5, 0, 2], [7, 1, 0], [3, 1, 1], [9, 1, 2]]`.
 * 2. Sort `originalElements`:
 *    `sortedElements` becomes `[[2, 0, 0], [3, 1, 1], [4, 0, 1], [5, 0, 2], [7, 1, 0], [9, 1, 2]]`.
 * 3. Initialize:
 *    `resultGrid = [[0, 0, 0], [0, 0, 0]]`
 *    `rowMaximumTracker = [0, 0]`
 *    `columnMaximumTracker = [0, 0, 0]`
 *
 * 4. Process `sortedElements`:
 *    - Element: `[2, 0, 0]` (originalValue: 2, elementRow: 0, elementCol: 0)
 *      `assignedNumber = Math.max(rowMaximumTracker[0], columnMaximumTracker[0]) + 1 = Math.max(0, 0) + 1 = 1`
 *      `resultGrid[0][0] = 1`
 *      `rowMaximumTracker[0] = 1`, `columnMaximumTracker[0] = 1`
 *      `resultGrid = [[1, 0, 0], [0, 0, 0]]`, `rowMaximumTracker = [1, 0]`, `columnMaximumTracker = [1, 0, 0]`
 *
 *    - Element: `[3, 1, 1]` (originalValue: 3, elementRow: 1, elementCol: 1)
 *      `assignedNumber = Math.max(rowMaximumTracker[1], columnMaximumTracker[1]) + 1 = Math.max(0, 0) + 1 = 1`
 *      `resultGrid[1][1] = 1`
 *      `rowMaximumTracker[1] = 1`, `columnMaximumTracker[1] = 1`
 *      `resultGrid = [[1, 0, 0], [0, 1, 0]]`, `rowMaximumTracker = [1, 1]`, `columnMaximumTracker = [1, 1, 0]`
 *
 *    - Element: `[4, 0, 1]` (originalValue: 4, elementRow: 0, elementCol: 1)
 *      `assignedNumber = Math.max(rowMaximumTracker[0], columnMaximumTracker[1]) + 1 = Math.max(1, 1) + 1 = 2`
 *      `resultGrid[0][1] = 2`
 *      `rowMaximumTracker[0] = 2`, `columnMaximumTracker[1] = 2`
 *      `resultGrid = [[1, 2, 0], [0, 1, 0]]`, `rowMaximumTracker = [2, 1]`, `columnMaximumTracker = [1, 2, 0]`
 *
 *    - Element: `[5, 0, 2]` (originalValue: 5, elementRow: 0, elementCol: 2)
 *      `assignedNumber = Math.max(rowMaximumTracker[0], columnMaximumTracker[2]) + 1 = Math.max(2, 0) + 1 = 3`
 *      `resultGrid[0][2] = 3`
 *      `rowMaximumTracker[0] = 3`, `columnMaximumTracker[2] = 3`
 *      `resultGrid = [[1, 2, 3], [0, 1, 0]]`, `rowMaximumTracker = [3, 1]`, `columnMaximumTracker = [1, 2, 3]`
 *
 *    - Element: `[7, 1, 0]` (originalValue: 7, elementRow: 1, elementCol: 0)
 *      `assignedNumber = Math.max(rowMaximumTracker[1], columnMaximumTracker[0]) + 1 = Math.max(1, 1) + 1 = 2`
 *      `resultGrid[1][0] = 2`
 *      `rowMaximumTracker[1] = 2`, `columnMaximumTracker[0] = 2`
 *      `resultGrid = [[1, 2, 3], [2, 1, 0]]`, `rowMaximumTracker = [3, 2]`, `columnMaximumTracker = [2, 2, 3]`
 *
 *    - Element: `[9, 1, 2]` (originalValue: 9, elementRow: 1, elementCol: 2)
 *      `assignedNumber = Math.max(rowMaximumTracker[1], columnMaximumTracker[2]) + 1 = Math.max(2, 3) + 1 = 4`
 *      `resultGrid[1][2] = 4`
 *      `rowMaximumTracker[1] = 4`, `columnMaximumTracker[2] = 4`
 *      `resultGrid = [[1, 2, 3], [2, 1, 4]]`, `rowMaximumTracker = [3, 4]`, `columnMaximumTracker = [2, 2, 4]`
 *
 * 5. Return: `[[1, 2, 3], [2, 1, 4]]`.
 * Time Complexity: O(M * N log(M * N))
 * Space Complexity: O(M * N)
 */
var minScore = function (grid) {
  const matrixRows = grid.length;
  const matrixCols = grid[0].length;

  const originalElements = [];
  for (let rIter = 0; rIter < matrixRows; rIter++) {
    for (let cIter = 0; cIter < matrixCols; cIter++) {
      originalElements.push([grid[rIter][cIter], rIter, cIter]);
    }
  }

  originalElements.sort(
    (firstElement, secondElement) => firstElement[0] - secondElement[0]
  );

  const resultGrid = Array.from({ length: matrixRows }, () =>
    Array(matrixCols).fill(0)
  );
  const rowMaximumTracker = new Array(matrixRows).fill(0);
  const columnMaximumTracker = new Array(matrixCols).fill(0);

  for (const elementData of originalElements) {
    const originalValue = elementData[0];
    const elementRow = elementData[1];
    const elementCol = elementData[2];

    const assignedNumber =
      Math.max(
        rowMaximumTracker[elementRow],
        columnMaximumTracker[elementCol]
      ) + 1;

    resultGrid[elementRow][elementCol] = assignedNumber;
    rowMaximumTracker[elementRow] = assignedNumber;
    columnMaximumTracker[elementCol] = assignedNumber;
  }

  return resultGrid;
};

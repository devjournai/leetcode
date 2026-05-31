/**
 * Remove All Ones With Row And Column Flips Ii
 * Intuition: This problem asks for the minimum number of operations to eliminate all '1's from a binary grid. An operation involves picking a '1' at `grid[i][j]` and setting all cells in row `i` and column `j` to zero. This structure suggests a recursive approach where we try each possible '1' as the next operation. Since we want the minimum number, and there are overlapping subproblems (multiple paths can lead to the same grid state), dynamic programming with memoization is an ideal fit. The state of our DP will be the current grid configuration.
 * Approach:
 * 1. Initialize `matrixRows` and `matrixColumns` from the input `grid`.
 * 2. Create a `memoizationCache` (a Map) to store results of previously computed grid states to avoid redundant calculations. The key for the map will be a string representation of the grid.
 * 3. Define a recursive helper function, `computeMinimumOperations`, which takes the `currentGrid`, dimensions, and the cache as parameters.
 * 4. Inside `computeMinimumOperations`:
 *    a. Generate a unique `gridKey` for the `currentGrid` (e.g., by joining all row strings with a delimiter).
 *    b. If `gridKey` exists in `memoizationCache`, return the cached value.
 *    c. Check if `currentGrid` contains any '1's using an `areAllZeroes` helper function. If it's all zeroes, return `0` (base case).
 *    d. Initialize `minimumOperationsNeeded` to `Infinity`.
 *    e. Iterate through each cell of the `currentGrid` using nested loops.
 *    f. If a cell `currentGrid[rowIterator][columnIterator]` is '1':
 *       i. Create a `nextGridState` by applying the flip operation on `currentGrid` at `(rowIterator, columnIterator)` using an `applyFlipOperation` helper function.
 *       ii. Recursively call `computeMinimumOperations` with `nextGridState`.
 *       iii. Update `minimumOperationsNeeded = Math.min(minimumOperationsNeeded, 1 + recursiveResult)`.
 *    g. Store `minimumOperationsNeeded` in `memoizationCache` with `gridKey`.
 *    h. Return `minimumOperationsNeeded`.
 * 5. Define `areAllZeroes` helper: Iterates through the given grid and returns `true` if all cells are `0`, `false` otherwise.
 * 6. Define `applyFlipOperation` helper: Takes an `originalGrid`, target row and column indices, and dimensions. It creates a deep copy of the `originalGrid`, sets all cells in the `targetRowIndex` and `targetColumnIndex` to `0`, and returns the `freshGrid`.
 * 7. Start the process by calling `computeMinimumOperations` with the initial `grid`.
 * Dry Run: grid = [[0,1],[1,0]]
 * 1. `removeOnes` starts. `matrixRows = 2`, `matrixColumns = 2`. `memoizationCache = Map()`.
 * 2. `computeMinimumOperations([[0,1],[1,0]], 2, 2, memoizationCache)`:
 *    - `gridKey = "01|10"`. Not in cache.
 *    - `areAllZeroes([[0,1],[1,0]])` returns `false`.
 *    - `minimumOperationsNeeded = Infinity`.
 *    - Loop `rowIterator=0, columnIterator=0`: `grid[0][0]` is `0`. Skip.
 *    - Loop `rowIterator=0, columnIterator=1`: `grid[0][1]` is `1`.
 *      - `nextGridState = applyFlipOperation([[0,1],[1,0]], 0, 1, 2, 2)` -> `[[0,0],[1,0]]` (row 0 and col 1 zeroed).
 *      - `recursiveResult = computeMinimumOperations([[0,0],[1,0]], 2, 2, memoizationCache)`:
 *        - `gridKey = "00|10"`. Not in cache.
 *        - `areAllZeroes` is `false`. `subMinimumOperations = Infinity`.
 *        - Loop `subRowIterator=0, subColIterator=0`: `0`.
 *        - Loop `subRowIterator=0, subColIterator=1`: `0`.
 *        - Loop `subRowIterator=1, subColIterator=0`: `1`.
 *          - `subNextGridState = applyFlipOperation([[0,0],[1,0]], 1, 0, 2, 2)` -> `[[0,0],[0,0]]`.
 *          - `subRecursiveResult = computeMinimumOperations([[0,0],[0,0]], 2, 2, memoizationCache)`:
 *            - `gridKey = "00|00"`. Not in cache.
 *            - `areAllZeroes` is `true`. Returns `0`.
 *          - `subMinimumOperations = Math.min(Infinity, 1 + 0) = 1`.
 *        - Loop `subRowIterator=1, subColIterator=1`: `0`.
 *        - `memoizationCache.set("00|10", 1)`. Returns `1`.
 *      - `minimumOperationsNeeded = Math.min(Infinity, 1 + 1) = 2`.
 *    - Loop `rowIterator=1, columnIterator=0`: `grid[1][0]` is `1`.
 *      - `nextGridState = applyFlipOperation([[0,1],[1,0]], 1, 0, 2, 2)` -> `[[0,1],[0,0]]`.
 *      - `recursiveResult = computeMinimumOperations([[0,1],[0,0]], 2, 2, memoizationCache)`:
 *        - `gridKey = "01|00"`. Not in cache.
 *        - `areAllZeroes` is `false`. `subMinimumOperations2 = Infinity`.
 *        - Loop `subRowIter2=0, subColIter2=0`: `0`.
 *        - Loop `subRowIter2=0, subColIter2=1`: `1`.
 *          - `subNextGridState2 = applyFlipOperation([[0,1],[0,0]], 0, 1, 2, 2)` -> `[[0,0],[0,0]]`.
 *          - `subRecursiveResult2 = computeMinimumOperations([[0,0],[0,0]], 2, 2, memoizationCache)` -> Returns `0` (base case / cached).
 *          - `subMinimumOperations2 = Math.min(Infinity, 1 + 0) = 1`.
 *        - `memoizationCache.set("01|00", 1)`. Returns `1`.
 *      - `minimumOperationsNeeded = Math.min(2, 1 + 1) = 2`.
 *    - Loop `rowIterator=1, columnIterator=1`: `grid[1][1]` is `0`. Skip.
 *    - `memoizationCache.set("01|10", 2)`. Returns `2`.
 * 3. Final result `2`.
 * Time Complexity: O(S * (M*N)^2)
 * Space Complexity: O(S * M*N)
 */
var removeOnes = function (grid) {
  const matrixRows = grid.length;
  const matrixColumns = grid[0].length;
  const memoizationCache = new Map();

  const computeMinimumOperations = (
    currentMatrix,
    matrixRowCount,
    matrixColumnCount,
    memoizationStore,
  ) => {
    const matrixKey = currentMatrix
      .map((rowContent) => rowContent.join(""))
      .join("|");
    if (memoizationStore.has(matrixKey)) {
      return memoizationStore.get(matrixKey);
    }

    if (checkNoOnes(currentMatrix, matrixRowCount, matrixColumnCount)) {
      return 0;
    }

    let minimumOperationsNeeded = Infinity;

    for (let rowIterator = 0; rowIterator < matrixRowCount; rowIterator++) {
      for (
        let columnIterator = 0;
        columnIterator < matrixColumnCount;
        columnIterator++
      ) {
        if (currentMatrix[rowIterator][columnIterator] === 1) {
          const transformedMatrix = applyFlipOperation(
            currentMatrix,
            rowIterator,
            columnIterator,
            matrixRowCount,
            matrixColumnCount,
          );
          const recursiveResult = computeMinimumOperations(
            transformedMatrix,
            matrixRowCount,
            matrixColumnCount,
            memoizationStore,
          );
          minimumOperationsNeeded = Math.min(
            minimumOperationsNeeded,
            1 + recursiveResult,
          );
        }
      }
    }

    memoizationStore.set(matrixKey, minimumOperationsNeeded);
    return minimumOperationsNeeded;
  };

  const checkNoOnes = (matrixToCheck, totalRowsNumber, totalColumnsNumber) => {
    for (let checkRowIdx = 0; checkRowIdx < totalRowsNumber; checkRowIdx++) {
      for (
        let checkColIdx = 0;
        checkColIdx < totalColumnsNumber;
        checkColIdx++
      ) {
        if (matrixToCheck[checkRowIdx][checkColIdx] === 1) {
          return false;
        }
      }
    }
    return true;
  };

  const applyFlipOperation = (
    originalMatrix,
    targetRowIndex,
    targetColumnIndex,
    totalRowsDimension,
    totalColumnsDimension,
  ) => {
    const freshMatrix = originalMatrix.map((rowValues) => [...rowValues]);

    for (
      let columnZeroer = 0;
      columnZeroer < totalColumnsDimension;
      columnZeroer++
    ) {
      freshMatrix[targetRowIndex][columnZeroer] = 0;
    }

    for (let rowZeroer = 0; rowZeroer < totalRowsDimension; rowZeroer++) {
      freshMatrix[rowZeroer][targetColumnIndex] = 0;
    }

    return freshMatrix;
  };

  return computeMinimumOperations(
    grid,
    matrixRows,
    matrixColumns,
    memoizationCache,
  );
};

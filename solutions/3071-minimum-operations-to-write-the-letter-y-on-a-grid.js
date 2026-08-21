/**
 * Minimum Operations To Write The Letter Y On A Grid
 * Intuition: The problem requires transforming the grid into a state where Y-cells have one value and non-Y-cells have a different value. Since there are only three possible values (0, 1, 2) for cells, we can exhaustively test all valid combinations for the target value of Y-cells and non-Y-cells. For each combination, we calculate the operations needed by counting how many cells don't match the target value, and then select the minimum across all combinations.
 * Approach: 1. Determine the grid's center point. 2. Iterate through each cell of the grid. For each cell, identify if it belongs to the 'Y' shape based on its row and column indices. 3. Maintain two frequency arrays, one for Y-cells and one for non-Y-cells, to count occurrences of values 0, 1, and 2. Also, store the total count of Y-cells and non-Y-cells. 4. Iterate through all possible target values (0, 1, 2) for Y-cells. 5. Nested within, iterate through all possible target values (0, 1, 2) for non-Y-cells. 6. For each pair of target values, if they are different, calculate the operations needed: `(totalYCells - countOfYTargetValue) + (totalNonYCells - countOfNonYTargetValue)`. 7. Keep track of the minimum operations found across all valid pairs.
 * Dry Run:
 * Input: `grid = [[0,1,2],[1,0,1],[2,1,0]]`
 * `gridSize = 3`, `gridMid = 1`
 *
 * **Phase 1: Classify cells and count frequencies**
 * Initialize `yValuesFrequencies = [0,0,0]`, `nonYValuesFrequencies = [0,0,0]`
 * `totalYCellsFound = 0`, `totalNonYCellsFound = 0`
 *
 * Iterate `(rowIdx, colIdx)` from `(0,0)` to `(2,2)`:
 * - `(0,0)`: `0===0 && 0<=1` is true. Y-cell. `grid[0][0]=0`. `yValuesFrequencies[0]++` (now `[1,0,0]`), `totalYCellsFound++` (now `1`).
 * - `(0,1)`: Non-Y-cell. `grid[0][1]=1`. `nonYValuesFrequencies[1]++` (now `[0,1,0]`), `totalNonYCellsFound++` (now `1`).
 * - `(0,2)`: `0===(3-1-2) && 0<=1` is true. Y-cell. `grid[0][2]=2`. `yValuesFrequencies[2]++` (now `[1,0,1]`), `totalYCellsFound++` (now `2`).
 * - `(1,0)`: Non-Y-cell. `grid[1][0]=1`. `nonYValuesFrequencies[1]++` (now `[0,2,0]`), `totalNonYCellsFound++` (now `2`).
 * - `(1,1)`: `1===1 && 1<=1` is true OR `1===(3-1-1) && 1<=1` is true OR `1===1 && 1>=1` is true. Y-cell (center). `grid[1][1]=0`. `yValuesFrequencies[0]++` (now `[2,0,1]`), `totalYCellsFound++` (now `3`).
 * - `(1,2)`: Non-Y-cell. `grid[1][2]=1`. `nonYValuesFrequencies[1]++` (now `[0,3,0]`), `totalNonYCellsFound++` (now `3`).
 * - `(2,0)`: Non-Y-cell. `grid[2][0]=2`. `nonYValuesFrequencies[2]++` (now `[0,3,1]`), `totalNonYCellsFound++` (now `4`).
 * - `(2,1)`: `1===1 && 2>=1` is true. Y-cell. `grid[2][1]=1`. `yValuesFrequencies[1]++` (now `[2,1,1]`), `totalYCellsFound++` (now `4`).
 * - `(2,2)`: Non-Y-cell. `grid[2][2]=0`. `nonYValuesFrequencies[0]++` (now `[1,3,1]`), `totalNonYCellsFound++` (now `5`).
 *
 * End of Phase 1:
 * `yValuesFrequencies = [2,1,1]` (total 4 Y-cells)
 * `nonYValuesFrequencies = [1,3,1]` (total 5 non-Y-cells)
 * `totalYCellsFound = 4`
 * `totalNonYCellsFound = 5`
 *
 * **Phase 2: Calculate minimum operations**
 * `minTotalOperations = Infinity`
 *
 * Loop `targetValY` from 0 to 2:
 *   Loop `targetValNonY` from 0 to 2:
 *     If `targetValY === targetValNonY`, continue.
 *
 *     Case: `targetValY = 0`, `targetValNonY = 1`
 *       `opsForY = totalYCellsFound - yValuesFrequencies[0] = 4 - 2 = 2`
 *       `opsForNonY = totalNonYCellsFound - nonYValuesFrequencies[1] = 5 - 3 = 2`
 *       `currentComputedOperations = 2 + 2 = 4`
 *       `minTotalOperations = min(Infinity, 4) = 4`
 *
 *     Case: `targetValY = 0`, `targetValNonY = 2`
 *       `opsForY = 4 - yValuesFrequencies[0] = 4 - 2 = 2`
 *       `opsForNonY = 5 - nonYValuesFrequencies[2] = 5 - 1 = 4`
 *       `currentComputedOperations = 2 + 4 = 6`
 *       `minTotalOperations = min(4, 6) = 4`
 *
 *     Case: `targetValY = 1`, `targetValNonY = 0`
 *       `opsForY = 4 - yValuesFrequencies[1] = 4 - 1 = 3`
 *       `opsForNonY = 5 - nonYValuesFrequencies[0] = 5 - 1 = 4`
 *       `currentComputedOperations = 3 + 4 = 7`
 *       `minTotalOperations = min(4, 7) = 4`
 *
 *     ... (other combinations will be computed, eventually `minTotalOperations` remains 4 or updates if a smaller value is found)
 *
 * Final `minTotalOperations` will be 4.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var minimumOperationsToWriteY = function (gridParam) {
  const gridSize = gridParam.length;
  const gridMid = Math.floor(gridSize / 2);

  const yValuesFrequencies = [0, 0, 0];
  const nonYValuesFrequencies = [0, 0, 0];

  let totalYCellsFound = 0;
  let totalNonYCellsFound = 0;

  for (let rowIdx = 0; rowIdx < gridSize; rowIdx++) {
    for (let colIdx = 0; colIdx < gridSize; colIdx++) {
      const isYComponent =
        (rowIdx === colIdx && rowIdx <= gridMid) ||
        (rowIdx === gridSize - 1 - colIdx && rowIdx <= gridMid) ||
        (colIdx === gridMid && rowIdx >= gridMid);

      if (isYComponent) {
        yValuesFrequencies[gridParam[rowIdx][colIdx]]++;
        totalYCellsFound++;
      } else {
        nonYValuesFrequencies[gridParam[rowIdx][colIdx]]++;
        totalNonYCellsFound++;
      }
    }
  }

  let minTotalOperations = Infinity;

  for (let targetValY = 0; targetValY <= 2; targetValY++) {
    for (let targetValNonY = 0; targetValNonY <= 2; targetValNonY++) {
      if (targetValY !== targetValNonY) {
        const opsForY = totalYCellsFound - yValuesFrequencies[targetValY];
        const opsForNonY =
          totalNonYCellsFound - nonYValuesFrequencies[targetValNonY];
        const currentComputedOperations = opsForY + opsForNonY;
        minTotalOperations = Math.min(
          minTotalOperations,
          currentComputedOperations
        );
      }
    }
  }

  return minTotalOperations;
};

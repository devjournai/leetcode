/**
 * Maximum Trailing Zeros In A Cornered Path
 * Intuition: The number of trailing zeros in a product is determined by the minimum count of prime factors 2 and 5. A cornered path involves a horizontal segment and a vertical segment meeting at a turn cell. We can use 2D prefix sums to efficiently calculate the total counts of factors 2 and 5 for any given horizontal or vertical segment, centered around a chosen "turn" cell.
 * Approach: 1. Precompute the counts of factors 2 and 5 for each cell in the grid. 2. Build two 2D prefix sum arrays: one for horizontal segments (`horizontalPrefixSums`) and another for vertical segments (`verticalPrefixSums`). `horizontalPrefixSums[r][c]` stores the cumulative factors [2s, 5s] for `grid[r][0]` through `grid[r][c-1]`. Similarly for `verticalPrefixSums`. 3. Iterate through each cell `(r, c)` in the grid, considering it as the potential "turn" cell. 4. For each turn cell, calculate the factor counts for four possible cornered path configurations: Left-Up, Left-Down, Right-Up, Right-Down. Each configuration combines a horizontal segment and a vertical segment, with the turn cell's factors added exactly once. 5. Update the maximum number of trailing zeros found across all paths by taking `min(totalTwos, totalFives)` for each path.
 * Dry Run: grid = [[2, 5], [10, 1]]
 * 1. gridHeight = 2, gridWidth = 2
 * 2. `calculateFactors` (helper):
 *    - `calculateFactors(2)` -> `[1, 0]`
 *    - `calculateFactors(5)` -> `[0, 1]`
 *    - `calculateFactors(10)` -> `[1, 1]`
 *    - `calculateFactors(1)` -> `[0, 0]`
 * 3. `cellFactorsStore` (factors for each cell):
 *    `[[[1,0], [0,1]], [[1,1], [0,0]]]`
 * 4. `horizontalPrefixSums` (row prefix sums, `[r][c]` is sum up to `grid[r][c-1]`):
 *    `[[[0,0], [1,0], [1,1]],`
 *     `[[0,0], [1,1], [1,1]]]`
 * 5. `verticalPrefixSums` (col prefix sums, `[r][c]` is sum up to `grid[r-1][c]`):
 *    `[[[0,0], [0,0]],`
 *     `[[1,0], [0,1]],`
 *     `[[2,1], [0,1]]]`
 * 6. `maximumTrailingZeros = 0`
 * 7. Iterate through `pathRow`, `pathCol` as turn cell:
 *    - `pathRow = 0, pathCol = 0` (Cell `grid[0][0] = 2`, factors `[1,0]`)
 *      - `currentCellTwos = 1`, `currentCellFives = 0`
 *      - `leftUp` (Left part: `horizontalPrefixSums[0][0] = [0,0]`, Up part: `verticalPrefixSums[0][0] = [0,0]`) -> `[0,0]`. Path total: `[0+1, 0+0] = [1,0]`. `maxZeros = max(0, min(1,0)) = 0`.
 *      - `leftDown` (Left part: `horizontalPrefixSums[0][0] = [0,0]`, Down part: `verticalPrefixSums[2][0] - verticalPrefixSums[1][0] = [2,1] - [1,0] = [1,1]`) -> `[1,1]`. Path total: `[1+1, 1+0] = [2,1]`. `maxZeros = max(0, min(2,1)) = 1`.
 *      - `rightUp` (Right part: `horizontalPrefixSums[0][2] - horizontalPrefixSums[0][1] = [1,1] - [1,0] = [0,1]`, Up part: `verticalPrefixSums[0][0] = [0,0]`) -> `[0,1]`. Path total: `[0+1, 1+0] = [1,1]`. `maxZeros = max(1, min(1,1)) = 1`.
 *      - `rightDown` (Right part: `[0,1]`, Down part: `[1,1]`) -> `[1,2]`. Path total: `[1+1, 2+0] = [2,2]`. `maxZeros = max(1, min(2,2)) = 2`.
 *    - `pathRow = 0, pathCol = 1` (Cell `grid[0][1] = 5`, factors `[0,1]`)
 *      - `currentCellTwos = 0`, `currentCellFives = 1`
 *      - `leftUp` (Left part: `horizontalPrefixSums[0][1] = [1,0]`, Up part: `verticalPrefixSums[0][1] = [0,0]`) -> `[1,0]`. Path total: `[1+0, 0+1] = [1,1]`. `maxZeros = max(2, min(1,1)) = 2`.
 *      - (Other paths are calculated similarly. For `grid[0][1] = 5`, right path segments are empty or factors are [0,0].)
 *    - Continue for `pathRow = 1, pathCol = 0` (Cell `grid[1][0] = 10`, factors `[1,1]`)
 *    - Continue for `pathRow = 1, pathCol = 1` (Cell `grid[1][1] = 1`, factors `[0,0]`)
 * 8. Return `maximumTrailingZeros` which will be `2` (from path `2 -> 10 -> 1` or `5 -> 10 -> 1` or `2 -> 5 -> 10`).
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var maxTrailingZeros = function (grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  function calculateFactors(inputNumber) {
    let factorTwoCount = 0;
    let factorFiveCount = 0;
    let tempNumber = inputNumber;

    while (tempNumber > 0 && tempNumber % 2 === 0) {
      factorTwoCount++;
      tempNumber = Math.floor(tempNumber / 2);
    }

    while (tempNumber > 0 && tempNumber % 5 === 0) {
      factorFiveCount++;
      tempNumber = Math.floor(tempNumber / 5);
    }

    return [factorTwoCount, factorFiveCount];
  }

  const cellFactorsStore = Array.from(
    {
      length: gridHeight,
    },
    () =>
      Array.from(
        {
          length: gridWidth,
        },
        () => [0, 0]
      )
  );
  for (let rowScanner = 0; rowScanner < gridHeight; rowScanner++) {
    for (let colScanner = 0; colScanner < gridWidth; colScanner++) {
      cellFactorsStore[rowScanner][colScanner] = calculateFactors(
        grid[rowScanner][colScanner]
      );
    }
  }

  const horizontalPrefixSums = Array.from(
    {
      length: gridHeight,
    },
    () =>
      Array.from(
        {
          length: gridWidth + 1,
        },
        () => [0, 0]
      )
  );
  for (let rIndex = 0; rIndex < gridHeight; rIndex++) {
    for (let cIndex = 0; cIndex < gridWidth; cIndex++) {
      horizontalPrefixSums[rIndex][cIndex + 1][0] =
        horizontalPrefixSums[rIndex][cIndex][0] +
        cellFactorsStore[rIndex][cIndex][0];
      horizontalPrefixSums[rIndex][cIndex + 1][1] =
        horizontalPrefixSums[rIndex][cIndex][1] +
        cellFactorsStore[rIndex][cIndex][1];
    }
  }

  const verticalPrefixSums = Array.from(
    {
      length: gridHeight + 1,
    },
    () =>
      Array.from(
        {
          length: gridWidth,
        },
        () => [0, 0]
      )
  );
  for (let currentColumn = 0; currentColumn < gridWidth; currentColumn++) {
    for (let currentRow = 0; currentRow < gridHeight; currentRow++) {
      verticalPrefixSums[currentRow + 1][currentColumn][0] =
        verticalPrefixSums[currentRow][currentColumn][0] +
        cellFactorsStore[currentRow][currentColumn][0];
      verticalPrefixSums[currentRow + 1][currentColumn][1] =
        verticalPrefixSums[currentRow][currentColumn][1] +
        cellFactorsStore[currentRow][currentColumn][1];
    }
  }

  let maximumTrailingZeros = 0;
  for (let pathRow = 0; pathRow < gridHeight; pathRow++) {
    for (let pathCol = 0; pathCol < gridWidth; pathCol++) {
      const [currentCellTwos, currentCellFives] =
        cellFactorsStore[pathRow][pathCol];

      const leftPathTwos = horizontalPrefixSums[pathRow][pathCol][0];
      const leftPathFives = horizontalPrefixSums[pathRow][pathCol][1];

      const rightPathTwos =
        horizontalPrefixSums[pathRow][gridWidth][0] -
        horizontalPrefixSums[pathRow][pathCol + 1][0];
      const rightPathFives =
        horizontalPrefixSums[pathRow][gridWidth][1] -
        horizontalPrefixSums[pathRow][pathCol + 1][1];

      const upPathTwos = verticalPrefixSums[pathRow][pathCol][0];
      const upPathFives = verticalPrefixSums[pathRow][pathCol][1];

      const downPathTwos =
        verticalPrefixSums[gridHeight][pathCol][0] -
        verticalPrefixSums[pathRow + 1][pathCol][0];
      const downPathFives =
        verticalPrefixSums[gridHeight][pathCol][1] -
        verticalPrefixSums[pathRow + 1][pathCol][1];

      const allPathSums = [
        [
          leftPathTwos + upPathTwos + currentCellTwos,
          leftPathFives + upPathFives + currentCellFives,
        ],
        [
          leftPathTwos + downPathTwos + currentCellTwos,
          leftPathFives + downPathFives + currentCellFives,
        ],
        [
          rightPathTwos + upPathTwos + currentCellTwos,
          rightPathFives + upPathFives + currentCellFives,
        ],
        [
          rightPathTwos + downPathTwos + currentCellTwos,
          rightPathFives + downPathFives + currentCellFives,
        ],
      ];

      for (const pathPair of allPathSums) {
        maximumTrailingZeros = Math.max(
          maximumTrailingZeros,
          Math.min(pathPair[0], pathPair[1])
        );
      }
    }
  }

  return maximumTrailingZeros;
};

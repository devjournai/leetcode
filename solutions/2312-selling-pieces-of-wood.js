/**
 * Selling Pieces Of Wood
 * Intuition: The problem involves maximizing value by breaking down a larger item into smaller pieces, where the value of smaller pieces can be combined. This is a classic indicator for dynamic programming, where the optimal solution for a given piece of wood can be found by considering all possible first cuts and combining the maximum values obtainable from the resulting two sub-pieces.
 * Approach: 1. Initialize a 2D dynamic programming table, `maximumValueGrid`, of size `(m+1) x (n+1)`. Each `maximumValueGrid[h][w]` will store the maximum value obtainable from a piece of wood of height `h` and width `w`. Initialize all entries to 0. 2. Populate the `maximumValueGrid` with any direct sale prices provided. For each `[hi, wi, pricei]` in the `prices` array, update `maximumValueGrid[hi][wi]` to be the maximum of its current value and `pricei`. This accounts for selling a piece without any cuts. 3. Iterate `currentHeight` from 1 to `m` and `currentWidth` from 1 to `n` to compute `maximumValueGrid[currentHeight][currentWidth]`. 4. For each `(currentHeight, currentWidth)`: a. Consider all possible horizontal cuts: Iterate `horizontalDivider` from 1 up to `currentHeight - 1`. A cut at `horizontalDivider` splits the piece into `horizontalDivider x currentWidth` and `(currentHeight - horizontalDivider) x currentWidth`. Update `maximumValueGrid[currentHeight][currentWidth]` with the maximum of its current value and the sum `maximumValueGrid[horizontalDivider][currentWidth] + maximumValueGrid[currentHeight - horizontalDivider][currentWidth]`. b. Consider all possible vertical cuts: Iterate `verticalDivider` from 1 up to `currentWidth - 1`. A cut at `verticalDivider` splits the piece into `currentHeight x verticalDivider` and `currentHeight x (currentWidth - verticalDivider)`. Update `maximumValueGrid[currentHeight][currentWidth]` with the maximum of its current value and the sum `maximumValueGrid[currentHeight][verticalDivider] + maximumValueGrid[currentHeight][currentWidth - verticalDivider]`. 5. The final result is `maximumValueGrid[m][n]`.
 * Dry Run: m = 3, n = 3, prices = [[1,1,10], [1,2,15]]
 * 1. Initialize `maximumValueGrid` (4x4) with all zeros.
 *    `maximumValueGrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]`
 * 2. Populate with prices:
 *    - For [1,1,10]: `maximumValueGrid[1][1] = 10`
 *    - For [1,2,15]: `maximumValueGrid[1][2] = 15`
 *    `maximumValueGrid = [[0,0,0,0],[0,10,15,0],[0,0,0,0],[0,0,0,0]]`
 * 3. Iterate `currentHeight` from 1 to 3, `currentWidth` from 1 to 3:
 *    - `currentHeight = 1`:
 *      - `currentWidth = 1`: `maximumValueGrid[1][1]` is 10. No cuts.
 *      - `currentWidth = 2`: `maximumValueGrid[1][2]` is 15.
 *        - Vertical cut `verticalDivider = 1`: `max(15, maximumValueGrid[1][1] + maximumValueGrid[1][1]) = max(15, 10+10) = 20`. `maximumValueGrid[1][2] = 20`.
 *      - `currentWidth = 3`: `maximumValueGrid[1][3]` is 0.
 *        - Vertical cut `verticalDivider = 1`: `max(0, maximumValueGrid[1][1] + maximumValueGrid[1][2]) = max(0, 10+20) = 30`. `maximumValueGrid[1][3] = 30`.
 *        - Vertical cut `verticalDivider = 2`: `max(30, maximumValueGrid[1][2] + maximumValueGrid[1][1]) = max(30, 20+10) = 30`.
 *    - `currentHeight = 2`:
 *      - `currentWidth = 1`: `maximumValueGrid[2][1]` is 0.
 *        - Horizontal cut `horizontalDivider = 1`: `max(0, maximumValueGrid[1][1] + maximumValueGrid[1][1]) = max(0, 10+10) = 20`. `maximumValueGrid[2][1] = 20`.
 *      - `currentWidth = 2`: `maximumValueGrid[2][2]` is 0.
 *        - Horizontal cut `horizontalDivider = 1`: `max(0, maximumValueGrid[1][2] + maximumValueGrid[1][2]) = max(0, 20+20) = 40`. `maximumValueGrid[2][2] = 40`.
 *        - Vertical cut `verticalDivider = 1`: `max(40, maximumValueGrid[2][1] + maximumValueGrid[2][1]) = max(40, 20+20) = 40`.
 *      - `currentWidth = 3`: `maximumValueGrid[2][3]` is 0.
 *        - Horizontal cut `horizontalDivider = 1`: `max(0, maximumValueGrid[1][3] + maximumValueGrid[1][3]) = max(0, 30+30) = 60`. `maximumValueGrid[2][3] = 60`.
 *        - Vertical cut `verticalDivider = 1`: `max(60, maximumValueGrid[2][1] + maximumValueGrid[2][2]) = max(60, 20+40) = 60`.
 *        - Vertical cut `verticalDivider = 2`: `max(60, maximumValueGrid[2][2] + maximumValueGrid[2][1]) = max(60, 40+20) = 60`.
 *    - `currentHeight = 3`:
 *      - `currentWidth = 1`: `maximumValueGrid[3][1]` is 0.
 *        - Horizontal cut `horizontalDivider = 1`: `max(0, maximumValueGrid[1][1] + maximumValueGrid[2][1]) = max(0, 10+20) = 30`. `maximumValueGrid[3][1] = 30`.
 *        - Horizontal cut `horizontalDivider = 2`: `max(30, maximumValueGrid[2][1] + maximumValueGrid[1][1]) = max(30, 20+10) = 30`.
 *      - `currentWidth = 2`: `maximumValueGrid[3][2]` is 0.
 *        - Horizontal cut `horizontalDivider = 1`: `max(0, maximumValueGrid[1][2] + maximumValueGrid[2][2]) = max(0, 20+40) = 60`. `maximumValueGrid[3][2] = 60`.
 *        - Horizontal cut `horizontalDivider = 2`: `max(60, maximumValueGrid[2][2] + maximumValueGrid[1][2]) = max(60, 40+20) = 60`.
 *        - Vertical cut `verticalDivider = 1`: `max(60, maximumValueGrid[3][1] + maximumValueGrid[3][1]) = max(60, 30+30) = 60`.
 *      - `currentWidth = 3`: `maximumValueGrid[3][3]` is 0.
 *        - Horizontal cut `horizontalDivider = 1`: `max(0, maximumValueGrid[1][3] + maximumValueGrid[2][3]) = max(0, 30+60) = 90`. `maximumValueGrid[3][3] = 90`.
 *        - Horizontal cut `horizontalDivider = 2`: `max(90, maximumValueGrid[2][3] + maximumValueGrid[1][3]) = max(90, 60+30) = 90`.
 *        - Vertical cut `verticalDivider = 1`: `max(90, maximumValueGrid[3][1] + maximumValueGrid[3][2]) = max(90, 30+60) = 90`.
 *        - Vertical cut `verticalDivider = 2`: `max(90, maximumValueGrid[3][2] + maximumValueGrid[3][1]) = max(90, 60+30) = 90`.
 * 4. Return `maximumValueGrid[3][3]`, which is 90.
 * Time Complexity: O(m * n * (m + n))
 * Space Complexity: O(m * n)
 */
var sellingWood = function (m, n, prices) {
  const maximumValueGrid = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (const pieceData of prices) {
    const pieceHeight = pieceData[0];
    const pieceWidth = pieceData[1];
    const pieceSalePrice = pieceData[2];
    maximumValueGrid[pieceHeight][pieceWidth] = Math.max(
      maximumValueGrid[pieceHeight][pieceWidth],
      pieceSalePrice
    );
  }

  for (let currentHeight = 1; currentHeight <= m; currentHeight++) {
    for (let currentWidth = 1; currentWidth <= n; currentWidth++) {
      for (
        let horizontalDivider = 1;
        horizontalDivider < currentHeight;
        horizontalDivider++
      ) {
        maximumValueGrid[currentHeight][currentWidth] = Math.max(
          maximumValueGrid[currentHeight][currentWidth],
          maximumValueGrid[horizontalDivider][currentWidth] +
            maximumValueGrid[currentHeight - horizontalDivider][currentWidth]
        );
      }
      for (
        let verticalDivider = 1;
        verticalDivider < currentWidth;
        verticalDivider++
      ) {
        maximumValueGrid[currentHeight][currentWidth] = Math.max(
          maximumValueGrid[currentHeight][currentWidth],
          maximumValueGrid[currentHeight][verticalDivider] +
            maximumValueGrid[currentHeight][currentWidth - verticalDivider]
        );
      }
    }
  }

  return maximumValueGrid[m][n];
};

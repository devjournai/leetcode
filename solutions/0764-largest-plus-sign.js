/**
 * Largest Plus Sign
 * Intuition: The order of a plus centered at (r,c) is the min consecutive ones stretching left, right, up, and down. Precompute those four arm lengths on an n×n grid with mines set to 0.
 * Approach: 1. Fill `gridInitialized` with 1s, then zero each mine. 2. Forward pass: `leftConsecutiveOnes` / `upConsecutiveOnes` = 1 + previous cell, or 0 if the cell is a mine. 3. Backward pass: same for `rightConsecutiveOnes` / `downConsecutiveOnes`. 4. For every cell take `Math.min` of the four arms and keep `largestPlusOrder`.
 * Dry Run: n = 5, mines = [[4,2]].
 *   - Cell (2,2) has left/right/up consecutive ones of 3, but down stops before the mine: `downConsecutiveOnes` = 2.
 *   - Min arm = 2; no center yields more. Return 2.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var orderOfLargestPlusSign = function (n, mines) {
  const gridInitialized = Array(n)
    .fill(0)
    .map(() => Array(n).fill(1));

  for (let currentMineLocation of mines) {
    const mineRowCoordinate = currentMineLocation[0];
    const mineColCoordinate = currentMineLocation[1];
    gridInitialized[mineRowCoordinate][mineColCoordinate] = 0;
  }

  const leftConsecutiveOnes = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  const upConsecutiveOnes = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (
    let rowIndexIterateForward = 0;
    rowIndexIterateForward < n;
    rowIndexIterateForward++
  ) {
    for (
      let colIndexIterateForward = 0;
      colIndexIterateForward < n;
      colIndexIterateForward++
    ) {
      if (
        gridInitialized[rowIndexIterateForward][colIndexIterateForward] === 1
      ) {
        leftConsecutiveOnes[rowIndexIterateForward][colIndexIterateForward] =
          (colIndexIterateForward > 0
            ? leftConsecutiveOnes[rowIndexIterateForward][
                colIndexIterateForward - 1
              ]
            : 0) + 1;
        upConsecutiveOnes[rowIndexIterateForward][colIndexIterateForward] =
          (rowIndexIterateForward > 0
            ? upConsecutiveOnes[rowIndexIterateForward - 1][
                colIndexIterateForward
              ]
            : 0) + 1;
      }
    }
  }

  const rightConsecutiveOnes = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));
  const downConsecutiveOnes = Array(n)
    .fill(0)
    .map(() => Array(n).fill(0));

  for (
    let rowIndexIterateBackward = n - 1;
    rowIndexIterateBackward >= 0;
    rowIndexIterateBackward--
  ) {
    for (
      let colIndexIterateBackward = n - 1;
      colIndexIterateBackward >= 0;
      colIndexIterateBackward--
    ) {
      if (
        gridInitialized[rowIndexIterateBackward][colIndexIterateBackward] === 1
      ) {
        rightConsecutiveOnes[rowIndexIterateBackward][colIndexIterateBackward] =
          (colIndexIterateBackward < n - 1
            ? rightConsecutiveOnes[rowIndexIterateBackward][
                colIndexIterateBackward + 1
              ]
            : 0) + 1;
        downConsecutiveOnes[rowIndexIterateBackward][colIndexIterateBackward] =
          (rowIndexIterateBackward < n - 1
            ? downConsecutiveOnes[rowIndexIterateBackward + 1][
                colIndexIterateBackward
              ]
            : 0) + 1;
      }
    }
  }

  let largestPlusOrder = 0;
  for (let finalRowIndex = 0; finalRowIndex < n; finalRowIndex++) {
    for (let finalColIndex = 0; finalColIndex < n; finalColIndex++) {
      const currentMinArmLength = Math.min(
        leftConsecutiveOnes[finalRowIndex][finalColIndex],
        rightConsecutiveOnes[finalRowIndex][finalColIndex],
        upConsecutiveOnes[finalRowIndex][finalColIndex],
        downConsecutiveOnes[finalRowIndex][finalColIndex]
      );
      largestPlusOrder = Math.max(largestPlusOrder, currentMinArmLength);
    }
  }

  return largestPlusOrder;
};

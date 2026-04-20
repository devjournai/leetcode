/**
 * Largest Plus Sign
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
        downConsecutiveOnes[finalRowIndex][finalColIndex],
      );
      largestPlusOrder = Math.max(largestPlusOrder, currentMinArmLength);
    }
  }

  return largestPlusOrder;
};

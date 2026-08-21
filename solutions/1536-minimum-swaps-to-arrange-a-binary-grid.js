/**
 * Minimum Swaps to Arrange a Binary Grid
 * Intuition: Row i needs at least n-1-i trailing zeros. Greedily bubble the nearest sufficient row up, counting adjacent swaps.
 * Approach: 1. Compute trailing zeros per row. 2. For each target i, find the first later row with enough zeros and swap it upward. 3. If none, return -1.
 * Dry Run: grid = [[0,0,1],[1,1,0],[1,0,0]].
 *   - Trailing zeros [0,1,2]; row 0 needs 2 zeros from index 2 → two adjacent swaps → 2.
 * Time Complexity: O(n^3)
 * Space Complexity: O(n)
 */
var minSwaps = function (grid) {
  const gridSize = grid.length;
  const trailingZeroCountsArray = new Array(gridSize);

  const calculateTrailingZerosForRow = (
    currentGridReference,
    currentGridRowIdentifier
  ) => {
    let currentTrailingZeroValue = 0;
    let columnScanningIndex = gridSize - 1;
    while (columnScanningIndex >= 0) {
      if (
        currentGridReference[currentGridRowIdentifier][columnScanningIndex] ===
        0
      ) {
        currentTrailingZeroValue++;
      } else {
        break;
      }
      columnScanningIndex--;
    }
    return currentTrailingZeroValue;
  };

  for (let primaryRowIndex = 0; primaryRowIndex < gridSize; primaryRowIndex++) {
    trailingZeroCountsArray[primaryRowIndex] = calculateTrailingZerosForRow(
      grid,
      primaryRowIndex
    );
  }

  let totalSwapOperations = 0;

  for (
    let targetPositionIndex = 0;
    targetPositionIndex < gridSize - 1;
    targetPositionIndex++
  ) {
    const minimumRequiredZeros = gridSize - 1 - targetPositionIndex;
    let foundAcceptableRow = false;

    for (
      let currentScanningIndex = targetPositionIndex;
      currentScanningIndex < gridSize;
      currentScanningIndex++
    ) {
      if (
        trailingZeroCountsArray[currentScanningIndex] >= minimumRequiredZeros
      ) {
        foundAcceptableRow = true;

        for (
          let bubbleUpCounter = currentScanningIndex;
          bubbleUpCounter > targetPositionIndex;
          bubbleUpCounter--
        ) {
          let temporaryExchangeValue = trailingZeroCountsArray[bubbleUpCounter];
          trailingZeroCountsArray[bubbleUpCounter] =
            trailingZeroCountsArray[bubbleUpCounter - 1];
          trailingZeroCountsArray[bubbleUpCounter - 1] = temporaryExchangeValue;
          totalSwapOperations++;
        }
        break;
      }
    }

    if (!foundAcceptableRow) {
      return -1;
    }
  }

  return totalSwapOperations;
};

/**
 * Minimum Swaps to Arrange a Binary Grid
 * Time Complexity: O(n^3)
 * Space Complexity: O(n)
 */
var minSwaps = function (grid) {
  const gridSize = grid.length;
  const trailingZeroCountsArray = new Array(gridSize);

  const calculateTrailingZerosForRow = (
    currentGridReference,
    currentGridRowIdentifier,
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
      primaryRowIndex,
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

/**
 * Moving Stones Until Consecutive II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var numMovesStonesII = function (stonesPositions) {
  stonesPositions.sort((stoneA, stoneB) => stoneA - stoneB);

  const totalCount = stonesPositions.length;

  const spanForRemainingAfterFirst =
    stonesPositions[totalCount - 1] - stonesPositions[1] + 1;
  const stonesToMoveForFirstFixed = totalCount - 1;
  const movesIfFirstStoneFixed =
    spanForRemainingAfterFirst - stonesToMoveForFirstFixed;

  const spanForRemainingBeforeLast =
    stonesPositions[totalCount - 2] - stonesPositions[0] + 1;
  const stonesToMoveForLastFixed = totalCount - 1;
  const movesIfLastStoneFixed =
    spanForRemainingBeforeLast - stonesToMoveForLastFixed;

  const maximumPossibleMoves = Math.max(
    movesIfFirstStoneFixed,
    movesIfLastStoneFixed,
  );

  let minimumRequiredMoves = totalCount;
  let windowLeftIndex = 0;

  for (
    let windowRightIndex = 0;
    windowRightIndex < totalCount;
    ++windowRightIndex
  ) {
    while (
      stonesPositions[windowRightIndex] - stonesPositions[windowLeftIndex] + 1 >
      totalCount
    ) {
      windowLeftIndex++;
    }

    const currentWindowStoneCount = windowRightIndex - windowLeftIndex + 1;

    if (
      currentWindowStoneCount === totalCount - 1 &&
      stonesPositions[windowRightIndex] -
        stonesPositions[windowLeftIndex] +
        1 ===
        totalCount - 1
    ) {
      minimumRequiredMoves = Math.min(minimumRequiredMoves, 2);
    } else {
      minimumRequiredMoves = Math.min(
        minimumRequiredMoves,
        totalCount - currentWindowStoneCount,
      );
    }
  }

  return [minimumRequiredMoves, maximumPossibleMoves];
};

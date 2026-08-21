/**
 * Moving Stones Until Consecutive II
 * Intuition: Max moves is the larger of sliding the leftmost or rightmost stone into the opposite interior gap. Min moves is n minus the densest window of length n, except a special case that needs 2.
 * Approach: 1. Sort. 2. max = max(end-second-n+2, secondLast-start-n+2). 3. Sliding window of stones that fit in a span of n; min = n - windowSize, or 2 when n-1 stones already occupy n-1 consecutive slots. 4. Return [min,max].
 * Dry Run: stones = [7,4,9].
 *   - Sorted 4,7,9. Max is max(9-7+1-2, 7-4+1-2)=max(1,2)=2. Sliding window of length 3 holds 2 stones, min=1. [1,2].
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
    movesIfLastStoneFixed
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
        totalCount - currentWindowStoneCount
      );
    }
  }

  return [minimumRequiredMoves, maximumPossibleMoves];
};

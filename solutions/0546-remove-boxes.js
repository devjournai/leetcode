/**
 * Remove Boxes
 * Intuition: Score depends on collapsing a run of the same color. DP on interval `[left, right]` plus `k` extra boxes matching `boxes[left]` already attached: either pop the run now for `(k+run)^2`, or later merge with a later equal-colored box after clearing the gap.
 * Approach: 1. Memo table `[left][right][adjacentBoxCount]`. 2. Extend `currentScanIndex` over equal boxes after `left`, growing `totalConsecutiveBlock`. 3. Default: pop that block plus solve the suffix with 0 extras. 4. For later index matching `boxes[left]`, try clear the middle then recurse with extras = `totalConsecutiveBlock`. 5. Memoize max; start at `(0, n-1, 0)`.
 * Dry Run: boxes = [1,3,2,2,2,3,4,3,1].
 *   - Interval can pop the three 2's for 9, then merge 3's later; DP explores attaching extras vs popping immediately.
 *   - Optimal total is 23.
 * Time Complexity: O(N^4)
 * Space Complexity: O(N^3)
 */
var removeBoxes = function (boxes) {
  const boxArrayLength = boxes.length;
  const memoizationTable = new Array(boxArrayLength).fill(null).map(() => {
    return new Array(boxArrayLength)
      .fill(null)
      .map(() => new Array(boxArrayLength + 1).fill(0));
  });
  const calculateMaximumPoints = (
    leftBoundIndex,
    rightBoundIndex,
    adjacentBoxCount
  ) => {
    if (leftBoundIndex > rightBoundIndex) {
      return 0;
    }

    if (memoizationTable[leftBoundIndex][rightBoundIndex][adjacentBoxCount]) {
      return memoizationTable[leftBoundIndex][rightBoundIndex][
        adjacentBoxCount
      ];
    }

    let currentScanIndex = leftBoundIndex;
    let totalConsecutiveBlock = adjacentBoxCount + 1;

    while (
      currentScanIndex < rightBoundIndex &&
      boxes[currentScanIndex] === boxes[currentScanIndex + 1]
    ) {
      currentScanIndex++;
      totalConsecutiveBlock++;
    }

    let highestScoreAchieved =
      totalConsecutiveBlock * totalConsecutiveBlock +
      calculateMaximumPoints(currentScanIndex + 1, rightBoundIndex, 0);
    for (
      let nextSearchIndex = currentScanIndex + 1;
      nextSearchIndex <= rightBoundIndex;
      nextSearchIndex++
    ) {
      if (boxes[leftBoundIndex] === boxes[nextSearchIndex]) {
        const potentialMergedScore =
          calculateMaximumPoints(currentScanIndex + 1, nextSearchIndex - 1, 0) +
          calculateMaximumPoints(
            nextSearchIndex,
            rightBoundIndex,
            totalConsecutiveBlock
          );

        highestScoreAchieved = Math.max(
          highestScoreAchieved,
          potentialMergedScore
        );
      }
    }

    memoizationTable[leftBoundIndex][rightBoundIndex][adjacentBoxCount] =
      highestScoreAchieved;
    return highestScoreAchieved;
  };

  return calculateMaximumPoints(0, boxArrayLength - 1, 0);
};

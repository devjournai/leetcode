/**
 * Remove Boxes
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
    adjacentBoxCount,
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
            totalConsecutiveBlock,
          );

        highestScoreAchieved = Math.max(
          highestScoreAchieved,
          potentialMergedScore,
        );
      }
    }

    memoizationTable[leftBoundIndex][rightBoundIndex][adjacentBoxCount] =
      highestScoreAchieved;
    return highestScoreAchieved;
  };

  return calculateMaximumPoints(0, boxArrayLength - 1, 0);
};

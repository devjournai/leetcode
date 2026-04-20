/**
 * Stone Game Vii
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var stoneGameVII = function (stones) {
  const arrayLength = stones.length;

  const cumulativeSums = new Array(arrayLength + 1).fill(0);
  for (
    let currentStoneIndex = 0;
    currentStoneIndex < arrayLength;
    currentStoneIndex++
  ) {
    cumulativeSums[currentStoneIndex + 1] =
      cumulativeSums[currentStoneIndex] + stones[currentStoneIndex];
  }

  const memoTable = Array.from({ length: arrayLength }, () =>
    new Array(arrayLength).fill(0),
  );

  for (let currentStart = arrayLength - 1; currentStart >= 0; currentStart--) {
    for (
      let currentEnd = currentStart + 1;
      currentEnd < arrayLength;
      currentEnd++
    ) {
      const sumAfterPickingLeft =
        cumulativeSums[currentEnd + 1] - cumulativeSums[currentStart + 1];
      const scoreIfLeftStoneRemoved =
        sumAfterPickingLeft - memoTable[currentStart + 1][currentEnd];

      const sumAfterPickingRight =
        cumulativeSums[currentEnd] - cumulativeSums[currentStart];
      const scoreIfRightStoneRemoved =
        sumAfterPickingRight - memoTable[currentStart][currentEnd - 1];

      memoTable[currentStart][currentEnd] = Math.max(
        scoreIfLeftStoneRemoved,
        scoreIfRightStoneRemoved,
      );
    }
  }

  return memoTable[0][arrayLength - 1];
};

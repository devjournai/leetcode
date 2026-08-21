/**
 * Stone Game Vii
 * Intuition: Removing an end stone scores the remaining subarray sum. Optimal play maximizes (your score − opponent's remaining optimal), so interval DP stores the best score difference on `stones[start..end]`.
 * Approach: 1. Build `cumulativeSums` prefix sums. 2. Fill `memoTable` by increasing interval length: take left (`sumAfterPickingLeft − memoTable[start+1][end]`) or right analogously; store the max. 3. Return `memoTable[0][n-1]`.
 * Dry Run: stones = [5,3,1,4,2]
 * Prefix [0,5,8,9,13,15]. Optimal first-to-last difference is 6.
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
    new Array(arrayLength).fill(0)
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
        scoreIfRightStoneRemoved
      );
    }
  }

  return memoTable[0][arrayLength - 1];
};

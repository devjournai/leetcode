/**
 * Burst Balloons
 * Intuition: Pad the array with 1s. dp[L][R] is the max coins from bursting balloons strictly between L and R. The last balloon k in a span scores nums[L]*nums[k]*nums[R] plus the already-solved inner intervals.
 * Approach: 1. padded=[1,...nums,1], memo table size n+2. 2. For span=1..n, for each start, end=start+span-1. 3. For last-burst k in [start,end], coins = padded[start-1]*padded[k]*padded[end+1] + memo[start-1][k] + memo[k][end+1]; take max into memo[start-1][end+1]. 4. Return memo[0][n+1].
 * Dry Run: nums=[3,1,5,8].
 *   - Bottom-up fills increasing spans; memo[0][5]=167.
 *   - Return 167.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var maxCoins = function (inputNumbers) {
  const paddedValues = [1, ...inputNumbers, 1];
  const originalBalloonCount = inputNumbers.length;
  const totalPaddedLength = originalBalloonCount + 2;

  const memoizationTable = Array(totalPaddedLength)
    .fill(0)
    .map(() => Array(totalPaddedLength).fill(0));

  for (
    let currentSpan = 1;
    currentSpan <= originalBalloonCount;
    currentSpan++
  ) {
    for (
      let segmentStartIdx = 1;
      segmentStartIdx <= originalBalloonCount - currentSpan + 1;
      segmentStartIdx++
    ) {
      const segmentEndIdx = segmentStartIdx + currentSpan - 1;

      for (
        let splitPointIdx = segmentStartIdx;
        splitPointIdx <= segmentEndIdx;
        splitPointIdx++
      ) {
        const boundaryLeft = segmentStartIdx - 1;
        const boundaryRight = segmentEndIdx + 1;

        const coinsFromSplit =
          paddedValues[boundaryLeft] *
          paddedValues[splitPointIdx] *
          paddedValues[boundaryRight];
        const leftIntervalSum = memoizationTable[boundaryLeft][splitPointIdx];
        const rightIntervalSum = memoizationTable[splitPointIdx][boundaryRight];
        const totalPotentialCoins =
          leftIntervalSum + rightIntervalSum + coinsFromSplit;

        memoizationTable[boundaryLeft][boundaryRight] = Math.max(
          memoizationTable[boundaryLeft][boundaryRight],
          totalPotentialCoins
        );
      }
    }
  }

  return memoizationTable[0][originalBalloonCount + 1];
};

/**
 * Burst Balloons
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var maxCoins = function (inputNumbers) {
    const paddedValues = [1, ...inputNumbers, 1];
    const originalBalloonCount = inputNumbers.length;
    const totalPaddedLength = originalBalloonCount + 2;

    const memoizationTable = Array(totalPaddedLength).fill(0).map(() => Array(totalPaddedLength).fill(0));

    for (let currentSpan = 1; currentSpan <= originalBalloonCount; currentSpan++) {
        for (let segmentStartIdx = 1; segmentStartIdx <= originalBalloonCount - currentSpan + 1; segmentStartIdx++) {
            const segmentEndIdx = segmentStartIdx + currentSpan - 1;

            for (let splitPointIdx = segmentStartIdx; splitPointIdx <= segmentEndIdx; splitPointIdx++) {
                const boundaryLeft = segmentStartIdx - 1;
                const boundaryRight = segmentEndIdx + 1;

                const coinsFromSplit = paddedValues[boundaryLeft] * paddedValues[splitPointIdx] * paddedValues[boundaryRight];
                const leftIntervalSum = memoizationTable[boundaryLeft][splitPointIdx];
                const rightIntervalSum = memoizationTable[splitPointIdx][boundaryRight];
                const totalPotentialCoins = leftIntervalSum + rightIntervalSum + coinsFromSplit;

                memoizationTable[boundaryLeft][boundaryRight] = Math.max(
                    memoizationTable[boundaryLeft][boundaryRight],
                    totalPotentialCoins
                );
            }
        }
    }

    return memoizationTable[0][originalBalloonCount + 1];
};
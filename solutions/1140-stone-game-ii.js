/**
 * Stone Game II
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var stoneGameII = function (piles) {
  const totalPiles = piles.length;
  const memoizationCache = new Map();
  const cumulativeSuffixSums = new Array(totalPiles + 1).fill(0);

  for (
    let currentPosition = totalPiles - 1;
    currentPosition >= 0;
    currentPosition--
  ) {
    cumulativeSuffixSums[currentPosition] =
      cumulativeSuffixSums[currentPosition + 1] + piles[currentPosition];
  }

  function calculateMaxStones(currentPileIndex, currentMValue) {
    if (currentPileIndex >= totalPiles) {
      return 0;
    }

    if (2 * currentMValue >= totalPiles - currentPileIndex) {
      return cumulativeSuffixSums[currentPileIndex];
    }

    const stateIdentifier = `${currentPileIndex},${currentMValue}`;
    if (memoizationCache.has(stateIdentifier)) {
      return memoizationCache.get(stateIdentifier);
    }

    let maxScoreForCurrentPlayer = 0;
    for (
      let numberOfPilesToTake = 1;
      numberOfPilesToTake <= 2 * currentMValue;
      numberOfPilesToTake++
    ) {
      const nextMValue = Math.max(currentMValue, numberOfPilesToTake);
      const opponentOptimalScore = calculateMaxStones(
        currentPileIndex + numberOfPilesToTake,
        nextMValue,
      );
      const currentTurnStones =
        cumulativeSuffixSums[currentPileIndex] - opponentOptimalScore;
      maxScoreForCurrentPlayer = Math.max(
        maxScoreForCurrentPlayer,
        currentTurnStones,
      );
    }

    memoizationCache.set(stateIdentifier, maxScoreForCurrentPlayer);
    return maxScoreForCurrentPlayer;
  }

  return calculateMaxStones(0, 1);
};

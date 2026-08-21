/**
 * Game Of Nim
 * Intuition: Standard Nim: a position is winning if some move leaves the opponent a losing position. Memoize pile tuples; all-zero is a loss.
 * Approach: 1. `solveGame` keys on joined pile sizes. 2. Try every pile and every take amount; if opponent loses, return true. 3. Else false.
 * Dry Run: piles=[1]. First player takes 1, opponent faces [0] and loses. Return true.
 * Time Complexity: O(N^2 * S_max^(N+1))
 * Space Complexity: O(S_max^N * N * log(S_max) + N * S_max)
 */
var nimGame = function (piles) {
  const memoStorage = new Map();

  const solveGame = (currentPileConfigurations) => {
    const stateIdentifier = currentPileConfigurations.join(",");
    if (memoStorage.has(stateIdentifier)) {
      return memoStorage.get(stateIdentifier);
    }

    const areAllPilesEmpty = currentPileConfigurations.every(
      (pileCount) => pileCount === 0
    );
    if (areAllPilesEmpty) {
      memoStorage.set(stateIdentifier, false);
      return false;
    }

    for (
      let pileIndexIteration = 0;
      pileIndexIteration < currentPileConfigurations.length;
      pileIndexIteration++
    ) {
      const currentPileSize = currentPileConfigurations[pileIndexIteration];
      for (
        let stonesTakenAmount = 1;
        stonesTakenAmount <= currentPileSize;
        stonesTakenAmount++
      ) {
        const nextPileConfigurations = [...currentPileConfigurations];
        nextPileConfigurations[pileIndexIteration] -= stonesTakenAmount;

        const opponentWins = solveGame(nextPileConfigurations);
        if (!opponentWins) {
          memoStorage.set(stateIdentifier, true);
          return true;
        }
      }
    }

    memoStorage.set(stateIdentifier, false);
    return false;
  };

  return solveGame(piles);
};

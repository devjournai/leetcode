/**
 * Game Of Nim
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
      (pileCount) => pileCount === 0,
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

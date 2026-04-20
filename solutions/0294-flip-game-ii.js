/**
 * Flip Game II
 * Time Complexity: O(N^2 * 2^N)
 * Space Complexity: O(N * 2^N)
 */
var canWin = function (currentStateInput) {
  const memoizationCache = new Map();

  function recursiveWinCheck(currentBoardState) {
    if (memoizationCache.has(currentBoardState)) {
      return memoizationCache.get(currentBoardState);
    }

    const boardLength = currentBoardState.length;
    for (let loopIndex = 0; loopIndex < boardLength - 1; loopIndex++) {
      const firstChar = currentBoardState[loopIndex];
      const secondChar = currentBoardState[loopIndex + 1];

      if (firstChar === "+" && secondChar === "+") {
        const prefixPart = currentBoardState.slice(0, loopIndex);
        const suffixPart = currentBoardState.slice(loopIndex + 2);
        const potentialNextState = prefixPart + "--" + suffixPart;

        const opponentLosesFromNextState =
          !recursiveWinCheck(potentialNextState);
        if (opponentLosesFromNextState) {
          memoizationCache.set(currentBoardState, true);
          return true;
        }
      }
    }

    memoizationCache.set(currentBoardState, false);
    return false;
  }

  return recursiveWinCheck(currentStateInput);
};

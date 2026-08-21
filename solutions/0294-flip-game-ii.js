/**
 * Flip Game II
 * Intuition: The current player wins if some "++"→"--" move leaves a position the opponent cannot win. Memoize each board string.
 * Approach: 1. If cached, return it. 2. For each "++", recurse on the flipped board; if the opponent loses, cache true and return. 3. If no such move, cache false.
 * Dry Run: currentState = "++++".
 *   - Move "+--+" has no "++", so opponent loses immediately → current player wins.
 *   - Return true.
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

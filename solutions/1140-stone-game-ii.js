/**
 * Stone Game II
 * Intuition: This is a classic minimax game theory problem, where Alice (the first player) wants to maximize her score, and Bob (the second player) will play optimally to maximize his own score (which implicitly minimizes Alice's remaining share from the total stones). Dynamic programming with memoization can be used to store optimal outcomes for subgames.
 * Approach: 1. Precompute suffix sums of the piles to quickly calculate the sum of stones in any contiguous range from a given index to the end. 2. Define a recursive function `computeMaxStones(currentPileOffset, currentMValueLimit)` which returns the maximum stones the current player can get from `piles[currentPileOffset:]` given `M = currentMValueLimit`. 3. Implement memoization using a map to store results for `(currentPileOffset, currentMValueLimit)` states. 4. In the recursive function, iterate through all possible `X` moves (from 1 to `2 * currentMValueLimit`). For each move, calculate the total stones remaining from `currentPileOffset`, and subtract the optimal stones the opponent would get from the subsequent state `(currentPileOffset + X, Math.max(currentMValueLimit, X))`. The current player chooses `X` to maximize this difference. 5. Handle base cases: if no piles are left, the score is 0; if the current player can take all remaining piles, they take all stones from `currentPileOffset` to the end.
 * Dry Run: piles = [1, 2, 3, 4, 5, 100]
 *   pileCount = 6
 *   precomputedSuffixSums = [115, 114, 112, 109, 105, 100, 0] (for indices 0 to 6)
 *   Call computeMaxStones(0, 1):
 *     currentPileOffset = 0, currentMValueLimit = 1
 *     Loop choicesForPiles from 1 to 2 * 1 = 2:
 *       - choicesForPiles = 1:
 *         nextPileOffset = 1, nextMValueLimit = max(1,1) = 1
 *         opponentBestResponse = computeMaxStones(1, 1) -> (recursively calculates) -> 11
 *         totalRemainingStoneSum = precomputedSuffixSums[0] = 115
 *         Current player's score for this choice = 115 - 11 = 104
 *         optimalScoreForCurrentPlayer = max(-inf, 104) = 104
 *       - choicesForPiles = 2:
 *         nextPileOffset = 2, nextMValueLimit = max(1,2) = 2
 *         opponentBestResponse = computeMaxStones(2, 2) -> (recursively calculates) -> 112 (base case: can take all remaining 4 piles)
 *         totalRemainingStoneSum = precomputedSuffixSums[0] = 115
 *         Current player's score for this choice = 115 - 112 = 3
 *         optimalScoreForCurrentPlayer = max(104, 3) = 104
 *     memoizationMap.set("0,1", 104)
 *     Return 104
 *   Thus, Alice gets 104 stones.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var stoneGameII = function (piles) {
  const pileCount = piles.length;
  const memoizationMap = new Map();
  const precomputedSuffixSums = new Array(pileCount + 1).fill(0);

  for (
    let currentItemIndex = pileCount - 1;
    currentItemIndex >= 0;
    currentItemIndex--
  ) {
    precomputedSuffixSums[currentItemIndex] =
      precomputedSuffixSums[currentItemIndex + 1] + piles[currentItemIndex];
  }

  function computeMaxStones(currentPileOffset, currentMValueLimit) {
    if (currentPileOffset >= pileCount) {
      return 0;
    }

    if (2 * currentMValueLimit >= pileCount - currentPileOffset) {
      return precomputedSuffixSums[currentPileOffset];
    }

    const memoKeyForState = `${currentPileOffset},${currentMValueLimit}`;
    if (memoizationMap.has(memoKeyForState)) {
      return memoizationMap.get(memoKeyForState);
    }

    let optimalScoreForCurrentPlayer = -Infinity;
    for (
      let choicesForPiles = 1;
      choicesForPiles <= 2 * currentMValueLimit;
      choicesForPiles++
    ) {
      const nextPileOffset = currentPileOffset + choicesForPiles;
      const nextMValueLimit = Math.max(currentMValueLimit, choicesForPiles);
      const opponentBestResponse = computeMaxStones(
        nextPileOffset,
        nextMValueLimit,
      );

      const totalRemainingStoneSum = precomputedSuffixSums[currentPileOffset];
      const currentPlayersScoreThisTurn =
        totalRemainingStoneSum - opponentBestResponse;

      optimalScoreForCurrentPlayer = Math.max(
        optimalScoreForCurrentPlayer,
        currentPlayersScoreThisTurn,
      );
    }

    memoizationMap.set(memoKeyForState, optimalScoreForCurrentPlayer);
    return optimalScoreForCurrentPlayer;
  }

  return computeMaxStones(0, 1);
};
